import { Console } from 'console';
import * as fs from 'fs';

/* dafnyCodeFile: path name of file containing dafny code
 * Spawns a process to run dafny, then writes whatever dafny outputs to dafnyOutput.txt,
 * to be sent back later.
 */
function runDafny(dafnyCodeFile : string){
    const {spawn} = require("child_process");
    var content: string = "";
    const child = spawn("/dafny/dafny", ["verify", dafnyCodeFile], 'utf-8');

    // concatenating all output from the shell to content
    child.stdout.on('data', (data : string) => {
        content.concat(`stdout: ${data}`);
    });
    
    child.stderr.on('data', (data : string) => {
        content.concat(`stderr: ${data}`);
    });
    
    child.on('close', (code : number) => {
        content.concat(`child process exited with code ${code}`);
    });
    
    // write whatever dafny outputs to a file
    fs.writeFileSync("dafnyOutput.txt", content);
}

export default runDafny;