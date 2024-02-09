To set up dafny in ubuntu and use it to run files:

- Have dotnet sdk installed. If it isn't installed, run "sudo apt install dotnet-sdk-6.0"
- Install the latest version of dafny into any directory we want. To do this, run the command "wget https://github.com/dafny-lang/dafny/releases/download/v4.4.0/dafny-4.4.0-x64-ubuntu-20.04.zip"
- Within the directory, the dafny executable will be dafny/dafny. To verify files, do "dafny/dafny verify <file>"
