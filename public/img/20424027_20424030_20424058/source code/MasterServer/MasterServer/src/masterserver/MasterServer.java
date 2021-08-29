/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package masterserver;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Admin
 */

public class MasterServer extends Thread{
    
    private ServerSocket serverSocket;
    private final int port;
    private boolean running = false;
    public HashMap<FileInfo, ArrayList<String>> fileServer = new HashMap<>();
    public ArrayList<Socket> clients = new ArrayList<>();
    
    
    public MasterServer( int port )
    {
        this.port = port;
    }

    public ArrayList<String> getListFile(){
        ArrayList<String> files = new ArrayList<String>();
        for(Map.Entry<FileInfo, ArrayList<String> > entry : fileServer.entrySet()) {
           FileInfo fileInfo = entry.getKey();
           if(fileInfo.socket.isConnected() && !fileInfo.socket.isClosed()){
                files.addAll(entry.getValue());
           }
           else{
               fileServer.remove(fileInfo);
           }
       }
       return files;
    }
    
    public boolean isDuplicate(FileInfo fileInfo){
        for(Map.Entry<FileInfo, ArrayList<String> > entry : fileServer.entrySet()) {
            FileInfo currentFileInfo = entry.getKey();
            if(currentFileInfo.serverIP.equals(fileInfo.serverIP) && currentFileInfo.serverPort == fileInfo.serverPort)
                return true;
        }
        return false;
    }
    public boolean addNewFileServer(FileInfo fileInfo, ArrayList<String> listFile){
        if(isDuplicate(fileInfo))
            return false;
        this.fileServer.put(fileInfo, listFile);    
        return true;
    }
    
    public FileInfo getFileByNumber(int choose){
 
        int index = 0;
        for(Map.Entry<FileInfo, ArrayList<String> > entry : fileServer.entrySet()) {
           FileInfo fileInfo = entry.getKey();
            for (String fileName : entry.getValue()) {
                index++;
                if(index == choose){
                   return new FileInfo(fileInfo.socket, fileInfo.serverIP, fileInfo.serverPort, fileName);
                }
            }
       }
       return null;
    }
    
    public void removeFile(Socket socket, String IP, int port){
        for(Map.Entry<FileInfo, ArrayList<String> > entry : fileServer.entrySet()) {
            FileInfo fileInfo = entry.getKey();
            if(fileInfo.serverIP.equals(IP) && fileInfo.serverPort == port){
                fileServer.remove(fileInfo);
            }
        }
    
    }
    
    public void startServer()
    {
        try
        {
            serverSocket = new ServerSocket(port);
            InetAddress inetAddress = InetAddress.getLocalHost();
            System.out.println("Server opened at: " + inetAddress.getHostAddress());
            System.out.println("port: " + port);

            this.start();
        }
        catch (IOException e)
        {
            System.err.print(e.getMessage());
        }
    }

    public void stopServer()
    {
        running = false;
        this.interrupt();
    }
    
    @Override
    public void run()
    {
        running = true;
        while( running )
        {
            try {
                System.out.println( "Server is listening for a connection" );
                // Call accept() to receive the next connection
                Socket socket = serverSocket.accept();
              
                
                // Get input and output streams
                DataInputStream din = new DataInputStream(socket.getInputStream());
                DataOutputStream dout = new DataOutputStream(socket.getOutputStream());
                
                  // get flag
                String whoIsConnect ="";
                whoIsConnect = din.readUTF();
                
                if(whoIsConnect.equals("client")){
                    clients.add(socket);
                    System.out.println( "A Client connected" );
                    ClientRequestHandler ch = new ClientRequestHandler(socket, this, din, dout);
                    ch.start();
                    
                }
                else if(whoIsConnect.equals("fileserver")){
                    System.out.println( "A File server connected" );
                    
                    String fileServerIP = din.readUTF();
                    int fileServerPort = din.readInt();
                    
                    ArrayList<String> fileShared = new ArrayList<>();
                    
                    //get number of files
                    int numOfFiles = 0;
                    numOfFiles = din.readInt();
                    
                    //get file name
                    for (int i = 0; i < numOfFiles; i++) {
                        String fileName = din.readUTF();
                        fileShared.add(fileName);
                    }
                    
                    FileInfo fileInfo = new FileInfo(socket,fileServerIP, fileServerPort);
                    if(addNewFileServer(fileInfo, fileShared)){
                        // this is a file server valid
                        dout.writeInt(1);
                        
                        checkFileServerDisconnect checkDisconnect = new checkFileServerDisconnect(socket, this, fileServerIP, fileServerPort );
                        checkDisconnect.start();
                    }
                    else{
                        // this is a file server invalid
                        dout.writeInt(0);
                        
                        System.err.println("Problem from file server...");
                        socket.close();
                    }
                    
                }
            } catch (IOException ex) {
                System.err.println(ex.getMessage());
            }
        }
    }

    /**
     * @param args the command line arguments
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException {
        // TODO code application logic here
        int port = 6666;
        MasterServer server = new MasterServer(port );
        server.startServer();
        // Automatically shutdown in 1 hour
        try
        {
            Thread.sleep( 60*60*1000 );
        }
        catch( Exception e )
        {
            e.printStackTrace();
        }

        server.stopServer();
    }
    
}





class ClientRequestHandler extends Thread{
    private final Socket socket;
    private MasterServer ms;
    DataInputStream din;
    DataOutputStream dout;
    ClientRequestHandler(Socket socket, MasterServer ms, DataInputStream din, DataOutputStream dout){
        this.socket = socket;
        this.ms = ms;
        this.din = din;
        this.dout = dout;
    }
    
    public void stopClientHandler(){
        this.interrupt();
    }

     @Override
    public void run(){
        try {
            // send menu
            int choose = -1;
            while(choose != 0){
                
                ArrayList<String> listFile = ms.getListFile();
                
                //send size of list to client
                dout.writeInt(listFile.size());
                
                //send menu to client
                int index = 1;
                StringBuilder sb = new StringBuilder();
                sb.append("============================\n");
                sb.append("\tFiles\n");
                sb.append("============================\n");
                for (String string : listFile) {
                    sb.append(index + ". " + string +"\n");
                    index ++;
                }
                
                if(listFile.size() <= 0){
                    sb.append("We don't have any files now \n");
                }
                
                sb.append("0. Exit\n");
                dout.writeUTF(sb.toString());
                dout.flush();
                
                //get choose from client
                choose = din.readInt();
                
                //exit
                if(choose == 0){
                    socket.close();
                    stopClientHandler();
                }
                
                FileInfo fileInfo = ms.getFileByNumber(choose);
                
                //send filename, ip, port to client
                String strFileInfo = "";
                if(fileInfo != null){
                    strFileInfo = String.format("%s@@%s@@%s", fileInfo.fileName, fileInfo.serverIP, fileInfo.serverPort);
                }
                
                dout.writeUTF(strFileInfo);
                dout.flush();
            }
            
        } catch (IOException ex) {
            System.err.println("A client disconnect");
            stopClientHandler();
            
//            Logger.getLogger(ClientRequestHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
}

 class FileInfo {
    Socket socket;
    int serverPort;
    String serverIP;
    String fileName;
    
    public FileInfo(Socket socket, String serverIP, int serverPort){
        this.socket = socket;
        this.serverIP = serverIP;
        this.serverPort = serverPort;
    }
     public FileInfo(String serverIP, int serverPort, String fileName){
        this.serverIP = serverIP;
        this.serverPort = serverPort;
        this.fileName = fileName;
    }
    public FileInfo(Socket socket, String serverIP, int serverPort, String fileName){
        this.socket = socket;
        this.serverIP = serverIP;
        this.serverPort = serverPort;
        this.fileName = fileName;
    }
}



class checkFileServerDisconnect extends Thread{
    private final Socket socket;
    private final String IP;
    private final int port;
    private final MasterServer ms;
    checkFileServerDisconnect(Socket socket , MasterServer ms, String IP, int port){
        this.socket = socket;
        this.ms = ms;
        this.IP = IP;
        this.port = port;
    }
    
    public void stopCheck(){
        this.interrupt();
    }
     @Override
    public void run(){
        try {
            DataInputStream din = new DataInputStream(socket.getInputStream());
            if(din.readLine() == null)
            {
                ms.removeFile(socket, IP, port);
                stopCheck();
            }
        } catch (IOException ex) {
            ms.removeFile(socket, IP, port);
            System.err.println("A File Server disconnected");
            stopCheck();
        }
    }
    
}
