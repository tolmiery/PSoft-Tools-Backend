// src/index.js
import express, { Express, RequestHandler } from "express";
import { verifyDafny, runDafny } from "./runDafny";
import { writeFileSync } from "fs";
import {exec} from "child_process";
import { Console } from "console";
import path from 'path';
var cors = require("cors");
var bodyParser = require("body-parser");

const app: Express = express();
const port = 3000;

const logRequest: RequestHandler = (req, res, next) => {
  next();
};

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(logRequest);

app.use(cors(corsOptions));
app.use(bodyParser.raw({ inflate: true, type: "text/plain" }));

// Posts the verify command with the dafnyCode given
app.post("/verify", (req, res) => {
  const dafnyCode: string = req.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    res.send(result);
  });
});

// Posts the run command with the dafnyCode given
app.post("/run", (req, res) => {
  const dafnyCode: string = req.body.toString();
  runDafny(dafnyCode).then((result) => {
    res.send(result);
  });
});
// Posts the hoare command for the hoare triple
app.post("/hoare", (request, response) => {
  // assuming request is some java code + precondition and postcondition, of the form:
  // {Precondition as boolean formula} code {Postcondition as boolean formula}
  const dafnyCode:string = request.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    response.send(result);
  });
});

//Posts forward reasoning using the verifyDafny command
app.post("/forward-reasoning", (request, response) => {
  const dafnyCode:string = request.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    response.send(result);
  });
});

//Posts backward reasoning using the verifyDafny command
app.post("/backward-reasoning", (request, response) => {
  const dafnyCode:string = request.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    response.send(result);
  });
});

//Runs the Python script for the HoareTriple problem generator
const runPythonScript = (type: string, result: any) => {
  const scriptPath = path.resolve(__dirname, '../../PSoft-Tools/psoft-tools/src/lib');
  exec(`cd '${scriptPath}' && python3 HoareTripleGrammar.py ${type}`, (err: Error | null, stdout: string, stderr: string) => {
      if (err) {
          console.error("Execution Error:", err);
          return result.status(500).send(`Execution Error:\n${err.message}`);
      }
      if (stderr) {
          console.error("Python stderr:", stderr);
          return result.status(500).send(`Python Error:\n${stderr}`);
      }
      console.log("Python script output:", stdout);
      result.send(stdout);
  });
};

// Calls runPythonScript when the generate triple button is pressed
app.post("/gentriple", (request, result) => {
  runPythonScript("1", result);
});

// Calls runPythonScript to generate a portion of a hoare triple for a forward gen problem
app.post("/forwardsgen", (request, result) => {
  runPythonScript("2", result);
});

// Calls runPythonScript to generate a portion of a hoare triple for a backwards gen problem
app.post("/backwardsgen", (request, result) => {
  runPythonScript("3", result);
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
