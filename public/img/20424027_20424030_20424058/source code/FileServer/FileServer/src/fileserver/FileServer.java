/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fileserver;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Admin
 */
public class FileServer {
    //master server info
    private static  int serverPort = 6666;
    private static  String serverIP = "localhost";
    
    //download server info
    private static String svDownloadIP;
    private static int svDownloadPort;
    private static HashMap<String, String> listFileShare = new HashMap<>();
    private static InetAddress clientIP;
    private static int clientPort;
    
    
    public static String getFilePath(String fileName){
        return listFileShare.get(fileName.trim());
    }
    //get config for file server
    public static void getInfomation() throws FileNotFoundException, IOException{
        File f = new File("./config/FileServerConfig.txt");
        FileReader fr = new FileReader(f);
        BufferedReader br = new BufferedReader(fr);
        
        svDownloadPort = Integer.parseInt(br.readLine().split(":")[1]);
        InetAddress inetAddress = InetAddress.getLocalHost();
        svDownloadIP =  inetAddress.getHostAddress();
        
        String fileShare = br.readLine(); // read title
        
        while( (fileShare = br.readLine()) != null){
            String[] splitFileShare =  fileShare.split("`");
            String fileName = splitFileShare[0].trim();
            String filePath = splitFileShare[1];
            listFileShare.put(fileName,filePath);
        }
        
        br.close();
        fr.close();
        
    }
    
    public static String readRequest(DatagramSocket server) throws IOException{
        byte[] temp = new byte[1024];
        DatagramPacket receive_packet = new DatagramPacket(temp, temp.length);
        server.receive(receive_packet);
        clientIP = receive_packet.getAddress();
        clientPort = receive_packet.getPort();
        return new String(receive_packet.getData());
       
    }
    
    public static void sendData(String value, DatagramSocket server, InetAddress clientIP, int clientPort) throws IOException{
        byte[] temp = value.getBytes();
        DatagramPacket sendPacket = new DatagramPacket(temp, temp.length, clientIP, clientPort);
        server.send(sendPacket);
    }
    
    public static void main(String[] args) throws IOException  {
       
        //get config file
        getInfomation();
        
        //check infomation
        if(listFileShare == null || listFileShare.size() == 0 || svDownloadIP == null){
            System.err.println("Please check config file again");
            return;
        }
        
        //connect to master server
        
        System.out.print("Enter master server IP: ");
        serverIP = new Scanner(System.in).nextLine();
        System.out.print("Enter master server port: ");
        serverPort = new Scanner(System.in).nextInt();
        
        Socket socket = new Socket(serverIP, serverPort);
        
        DataInputStream din = new DataInputStream(socket.getInputStream());
        DataOutputStream dout = new DataOutputStream(socket.getOutputStream());
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
 
        //tell master server this is file server
        dout.writeUTF("fileserver");
        
        //send IP
        dout.writeUTF(svDownloadIP);
        
        //send PORT
        dout.writeInt(svDownloadPort);      
        
        // send number of file
        dout.writeInt(listFileShare.size());
        
        // send list file
        for(Map.Entry<String, String> entry : listFileShare.entrySet()) {
            String key = entry.getKey();
            dout.writeUTF(key);
        }
        
        //check is valid file server
        int isValid = din.readInt();
        
        if(isValid == 0){
            System.err.println("Have a problem, maybe address already in use. Please check config file again.");
            return;
        }
        System.out.println("Connect to master server successful.");
        DatagramSocket server = new DatagramSocket(svDownloadPort);
        while(true){
            String fileNeedToDownLoad = readRequest(server);
            String filePath = getFilePath(fileNeedToDownLoad);
            
            File file = new File(filePath);
            if(filePath != null && file.exists() && !file.isDirectory()){
                sendData("exist",server,clientIP,clientPort);
                InetAddress tmpIP = clientIP;
                int tmpPort =  clientPort;
             
                SendFileServer SFS = new SendFileServer(server,tmpIP,tmpPort, file);
                SFS.start();
            }
            else{
                sendData("notexist",server,clientIP,clientPort);
            }   
        }
        //create download server
        // Automatically shutdown in 1 hour
//        try
//        {
//            Thread.sleep( 60*60*1000 );
//        }
//        catch( Exception e )
//        {
//            e.printStackTrace();
//        }
//        socket.close();
////
//        fileServer.stopServer();
    }
}

class SendFileServer extends Thread{
    private final DatagramSocket server;
    private final InetAddress clientIP;
    private final int clientPort;
    private final File file;
    private final int PIECES_OF_FILE_SIZE = 1024 * 32;
    public SendFileServer(DatagramSocket server, InetAddress clientIP, int clientPort, File file){
        this.server = server;
        this.clientIP = clientIP;
        this.clientPort = clientPort;
        this.file = file;
    }
    
    public void sendData(String value, DatagramSocket server) throws IOException{
        byte[] temp = value.getBytes();
        DatagramPacket sendPacket = new DatagramPacket(temp, temp.length, clientIP, clientPort);
        server.send(sendPacket);
    }

    
    @Override
    public void run()
    {
        try {
            InputStream inputStream = new FileInputStream(file);
            BufferedInputStream bis = new BufferedInputStream(inputStream);
            byte[] bytePart = new byte[PIECES_OF_FILE_SIZE];
            
            
            // get file size
                long fileSize = file.length();
                int piecesOfFile = (int) (fileSize / PIECES_OF_FILE_SIZE);
                int lastByteLength = (int) (fileSize % PIECES_OF_FILE_SIZE);

                // check last bytes of file
                if (lastByteLength > 0) {
                    piecesOfFile++;
                }
            
            
             // split file into pieces and assign to fileBytess
            byte[][] fileBytess = new byte[piecesOfFile][PIECES_OF_FILE_SIZE];
            int count = 0;
            while (bis.read(bytePart, 0, PIECES_OF_FILE_SIZE) != -1) {
                fileBytess[count] = bytePart;
                bytePart = new byte[PIECES_OF_FILE_SIZE];
                count++;
            }
            
            // close stream
            bis.close();
 
            // read file info
            String fileInfo = file.getName() + "@@" + file.length() + "@@" + piecesOfFile + "@@" + lastByteLength;

            // send file info
            sendData(fileInfo, server);

            // send file content
            System.out.println("File sending...");
            
            // send pieces of file
            for (int i = 0; i < (count - 1); i++) {
                DatagramPacket sendPacket = new DatagramPacket(fileBytess[i], PIECES_OF_FILE_SIZE,clientIP, clientPort);
                server.send(sendPacket);
                wait(40);
            }
            
            // send last bytes of file
            DatagramPacket sendPacket = new DatagramPacket(fileBytess[count - 1], PIECES_OF_FILE_SIZE, clientIP, clientPort);
            server.send(sendPacket);
            wait(40);

            sendData("done", server);
            System.out.println("Send successful.");
        } catch (IOException ex) {
            Logger.getLogger(SendFileServer.class.getName()).log(Level.SEVERE, null, ex);
        }
       
    }

    private void wait(int i) {
        try {
            Thread.sleep(i);
        } catch (InterruptedException ex) {
            System.out.println(ex.getMessage());
        }
    }
}

