#!/bin/bash
# Navigate to the correct installation directory
cd "$(dirname "$0")"
# Test for system dotnet, install if it is not present
if ! test -f "/usr/bin/dotnet" || ! dotnet --list-sdks | grep -q "6.0"; then
    echo .NET SDK 6.0 not installed! Installing it for you...
    sudo apt update
    sudo apt install -y dotnet-sdk-6.0
    echo .NET installed
fi
# Test for local dafny, install if not present
if ! test -f ./dafny/dafny; then
    echo Dafny not installed! Installing it for you...
    wget https://github.com/dafny-lang/dafny/releases/download/v4.4.0/dafny-4.4.0-x64-ubuntu-20.04.zip
    unzip dafny-4.4.0-x64-ubuntu-20.04.zip
    rm dafny-4.4.0-x64-ubuntu-20.04.zip
    echo Dafny installed
fi
# Test for Dafny-Files directory, create if not present
if ! test -d ./Dafny-Files; then
    echo Directory \"./src/Dafny-Files/\" not present! Creating it for you...
    mkdir ./Dafny-Files
    echo Directory \"./src/Dafny-Files/\" created
fi
# Test for dafnyCode.dfy file, create if not present
if ! test -f ./Dafny-Files/dafnyCode.dfy; then
    echo File \"dafnyCode.dfy\" not present! Creating it for you...
    touch ./Dafny-Files/dafnyCode.dfy
    echo File \"dafnyCode.dfy\" created
fi