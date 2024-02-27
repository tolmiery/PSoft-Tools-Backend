import { Console } from 'console';
import * as fs from 'fs';

/* @param dafnyCodeFile: name of dafny file
 * 
 */
function runDafny(dafnyCodeFile : string){
    const {spawn} = require("child_process");
    var content: string = "";
    const child = spawn("/dafny/dafny", ["verify", dafnyCodeFile], 'utf-8');
    child.stdout.on('data', (data : string) => {
        content.concat(`stdout: ${data}`);
    });
    
    child.stderr.on('data', (data : string) => {
        content.concat(`stderr: ${data}`);
    });
    
    child.on('close', (code : number) => {
        content.concat(`child process exited with code ${code}`);
    });
    fs.writeFileSync("dafnyOutput.txt", content);
}

export default runDafny;