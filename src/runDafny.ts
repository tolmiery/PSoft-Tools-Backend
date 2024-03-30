import { exec } from "child_process";
import { writeFileSync } from "fs";
export default async function runDafny(dafnyCode: string): Promise<string> {
  const dafnyBinaryPath = __dirname + "/dafny/dafny"; // Path to your Dafny binary
  const dafnyFilePath = __dirname + "/Dafny-Files/dafnyCode.dfy"; // Path to the Dafny file to be compiled
  const projectRoot = "./"; // Root directory of your project

  writeFileSync(
    __dirname + "/Dafny-Files/dafnyCode.dfy",
    dafnyCode.replace(/\r\n/g, "\n")
  );
  return new Promise<string>((resolve, reject) => {
    exec(
      `${dafnyBinaryPath} verify ${dafnyFilePath}`,
      { cwd: projectRoot },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Compile error: ${error}`);
          console.error(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        }
        resolve(stdout);
      }
    );
  });
}
