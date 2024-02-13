#!/bin/bash
if ! test -f "/usr/bin/dotnet"; then
    echo dotnet SDK not installed! Installing it for you...
    sudo apt update
    sudo apt install -y dotnet-sdk-6.0
    
    echo dotnet installed
fi

if ! test -f ./dafny/dafny; then
    echo dafny not installed! Installing it for you...
    wget https://github.com/dafny-lang/dafny/releases/download/v4.4.0/dafny-4.4.0-x64-ubuntu-20.04.zip
    unzip dafny-4.4.0-x64-ubuntu-20.04.zip
    rm dafny-4.4.0-x64-ubuntu-20.04.zip
    echo dafny installed
fi