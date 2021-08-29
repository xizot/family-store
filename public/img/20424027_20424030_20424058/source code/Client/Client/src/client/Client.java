/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import com.sun.source.tree.Scope;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

/**
 *
 * @author Admin
 */
public class Client {
    private static  int serverPort = 6666;
    private static  String serverIP = "localhost";
    
    public static void main(String[] args) throws IOException {
      // TODO code application logic here

      // connect to master server
        System.out.print("Enter master server IP: ");
        serverIP = new Scanner(System.in).nextLine();
        System.out.print("Enter master server port: ");
        serverPort = new Scanner(System.in).nextInt();
        
        Socket socket = new Socket(serverIP, serverPort);
        DataInputStream din = new DataInputStream(socket.getInputStream());
        DataOutputStream dout = new DataOutputStream(socket.getOutputStream());
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        //tell master server, this is client
        dout.writeUTF("client");

        System.out.println("Connect to master server successful.\n");
        int choose = -1;
        while(choose != 0){

            //get size of list form master server
            int listSize = din.readInt();

            //get list of file from master server
            String menu = din.readUTF();

            //print list file
            System.out.print(menu);
            System.out.println("Your choice? ");

            //input file need to download
            choose = Integer.parseInt(br.readLine());
            dout.writeInt(choose);

            if(choose == 0){
                System.out.println("Successful Exit.");
                break;
            }

             //get filename, ip, port of file server
            String fileInfo = din.readUTF();
            String fileServerIP ;
            int fileServerPort ;
            String fileName ;

            if(fileInfo != null && fileInfo.length() > 0){
                String[] arrFileInfo = fileInfo.split("@@");

                fileName = arrFileInfo[0];
                fileServerIP = arrFileInfo[1];
                fileServerPort = Integer.parseInt(arrFileInfo[2]);

                DatagramSocket client = new DatagramSocket();
                DownLoadFile DF = new DownLoadFile(client, fileName, fileServerIP, fileServerPort);
                DF.start();

                try
                {
                    Thread.sleep(1000);
                }
                catch( Exception e )
                {
                    e.printStackTrace();
                }

            }
            else{
                System.out.println("Your choice is not valid. Reload data...\n");
            }

            System.out.println("\n\n\n\n\n");
        }
        socket.close();
    }
}


class DownLoadFile extends Thread{
    DatagramSocket client;
    String fileName;
    private final int PIECES_OF_FILE_SIZE = 1024 * 32;
    InetAddress host;
    int port;
    
    public DownLoadFile(DatagramSocket client, String fileName, String Ip, int port) throws UnknownHostException{
        this.client = client;
        this.host = InetAddress.getByName(Ip);
        this.port = port;
        this.fileName = fileName;
    }
    
    
    public DatagramPacket createPacket(String value){
        byte[] arrData = value.getBytes();
        
        return new DatagramPacket(arrData, arrData.length,host,port);
    }
    

    @Override
    public void run(){
        try {
            byte[] dataReceive = new byte[PIECES_OF_FILE_SIZE];
            DatagramPacket DP = createPacket(fileName);
            
            //send file name need to download
            client.send(DP);
            
            // receive status
            String rs = receiveData(client);
            
            if(rs.trim().equals("exist".trim())){
                // get file info
                String fileInfo = receiveData(client);
                String[] splitFileInfo = fileInfo.split("@@");
                
                
                String fileName = splitFileInfo[0];
                long fileSize = Long.parseLong(splitFileInfo[1].trim());
                int piecesOfFile = Integer.parseInt(splitFileInfo[2].trim());
                int lastByteLength = Integer.parseInt(splitFileInfo[3].trim());
                String destinationDirectory = "./receive/" + fileName;
                
                
                System.out.println("\n\nFile name: " + fileName);
                System.out.println("File size: " + fileSize);
                System.out.println("Pieces of file: " + piecesOfFile);
                System.out.println("Last bytes length: "+ lastByteLength);
                System.out.println("Destination directory: "+ destinationDirectory);


                // get file content
                System.out.println("Downloading file...");
                
                File fileReceive = new File(destinationDirectory);
                BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(fileReceive));
                // receive pieces of file
                for (int i = 0; i < (piecesOfFile - 1); i++) {
                    DatagramPacket receivePacket = new DatagramPacket(dataReceive, dataReceive.length,host, port);
                    client.receive(receivePacket);
                    bos.write(dataReceive, 0, PIECES_OF_FILE_SIZE);
                }
                
                // receive last bytes of file
                DatagramPacket receivePacket = new DatagramPacket(dataReceive, dataReceive.length,host, port);
                client.receive(receivePacket);
                bos.write(dataReceive, 0, lastByteLength);
                bos.flush();
                // close stream
                bos.close();
                
                String status = "fail";
                status = receiveData(client);
                if(status.trim().equals("done")){
                    System.out.println("Download file: [" +fileName+ "] done!");
                }
                else{
                    System.err.println("Have a problem. Try downloading again.");
                    fileReceive.delete();
                }
                
            }
            else{
                System.err.println("Have a problem. Please restart server.");
            }
        } catch (Exception ex) {
            System.err.println("Have a problem. Please restart server.");
            System.err.println(ex.getMessage());
        }
    }
    
    public String receiveData(DatagramSocket server) throws IOException{
        byte[] temp = new byte[1024];
        DatagramPacket receive_packet = new DatagramPacket(temp, temp.length);
        server.receive(receive_packet);
        return new String(receive_packet.getData());
    }
    
}
