Program requirements: 
	- JDK 11.
	- The "config" folder is the same as the "FileSever.jar" folder path & config file "FileServerConfig.txt".(we created it)
	- The "receive" folder is the same as the "Client.jar" folder path. (we created it)

We built the source into a jar file. so please check how to run the project.
1. Go to "jar" folder.
2. Go to "jar/Master server" and run "MasterServer.jar". After running this file, 
   it will show the information of Master server (IP, Port).
3. Go to "jar/File Server/config" edit file "FileServerConfig.txt" 
	- First line is "Port of download server".
	- Second line is "structure" of file share.
	- Next lines is file information: "File name`File path".
4. Go to "jar/File Server" run "FileServer.jar" Enter IP, Port of Master server in "step 2".
5. Go to "jar/Client" run "Client.jar" Enter IP, Port of Master server in "step 2".