# PSoft-Tools-Backend
Backend for PSoft Tools. This provides support for features that the front end cannot run, such as Dafny operations.
## Features
### Dafny Code Verification/Running
Hosts an environment to verify and run Dafny code.
### Hoare Triple Verification
Hosts an environment to verify Hoare Triples that have been translated to Dafny code.
### Control Flow Graphs *(Under Development)*
Provides a tool that generates a control-flow graph from given Java code.
## Local Hosting/Development
### Setup
#### Node.js
1. Install the latest version of npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Install the dependencies: `npm install`
3. Set up the frontend server: https://github.com/tolmiery/PSoft-Tools
#### Dafny
This application requires .NET SDK 6.0 and Dafny in order to run. We recommend using the provided script `./src/dafnySetup.sh` to automatically install required components; however, these are the steps to manually do so:
1. Install .NET SDK 6.0: `sudo apt install dotnet-sdk-6.0`
2. Install Dafny into the "src/dafny" directory:
    - `cd ./src`
    - `wget https://github.com/dafny-lang/dafny/releases/download/v4.4.0/dafny-4.4.0-x64-ubuntu-20.04.zip`
    - `unzip dafny-4.4.0-x64-ubuntu-20.04.zip`
3. Create the required file "src/Dafny-Files/dafnyCode.dfy":
    - `mkdir ./src/Dafny-Files`
    - `touch ./src/Dafny-Files/dafnyCode.dfy`

### Running
1. Run the dev server: `npm run dev`
2. Run the frontend dev server in a separate terminal: 
    - `cd /path/to/PSoft-Tools/psoft-tools`
    - `npm run dev`
### Troubleshooting
* **EACESS ERROR:** This may occur when trying to install npm after already having a previous installation. The error can be resolved by uninstalling npm and node completely using the commands `sudo apt-get remove nodejs` and `sudo apt-get remove npm` followed by reinstallation. If the error persists after reinstallation, your version(s) of node and/or npm may be out of date. NOTE: **avoid installing using `sudo` for installation**, as this often causes EACESS error.
*  **OUTDATED NODE/NPM:** in some cases, the usual installation methods linked above may result in an out of date installation. The project is compatible with the most recent versions of node/npm, which are currently `npm 10.9.2` and `node v22.13.1`. Your current versions can be checked using the command `npm version`. If they are out of date, uninstall and reinstall using the appropriate commands for your OS linked here: https://nodejs.org/en/download/. This should resolve errors with vite and EACESS errors.
## Contributors (Spring 2024)
Project Lead: Cal Hiffa (tolmiery)  
Member: Nathaniel Viana (NDViana)  
Member: Kevin Lukash (kevinlukash)  
Member: Tyler Hunt (thuntxiv)
