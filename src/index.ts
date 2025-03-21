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
//app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.raw({ inflate: true, type: "text/plain" }));

app.post("/verify", (req, res) => {
  const dafnyCode: string = req.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    res.send(result);
  });
});

app.post("/run", (req, res) => {
  const dafnyCode: string = req.body.toString();
  runDafny(dafnyCode).then((result) => {
    res.send(result);
  });
});
app.post("/hoare", (request, response) => {
  // assuming request is some java code + precondition and postcondition, of the form:
  // {Precondition as boolean formula} code {Postcondition as boolean formula}
  const dafnyCode:string = request.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    response.send(result);
  });
});

app.post("/forward-reasoning", (request, response) => {
  const dafnyCode:string = request.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    response.send(result);
  });
});

app.post("/backward-reasoning", (request, response) => {
  const dafnyCode:string = request.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    response.send(result);
  });
});

app.post("/gentriple", (request, result) => {
  const scriptPath = path.resolve(__dirname, '../../PSoft-Tools/psoft-tools/src/lib/HoareTripleGrammar.py');
  
  exec(`python3 ${scriptPath}`, (err: Error | null, stdout: string, stderr: string) => {
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
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
