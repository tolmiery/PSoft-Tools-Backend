// src/index.js
import express, { Express, RequestHandler } from "express";
import { verifyDafny, runDafny } from "./runDafny";
import dafnyParser from "./dafnyParse";
import { writeFileSync } from "fs";
import {exec} from "child_process";
var cors = require("cors");
var bodyParser = require("body-parser");

const app: Express = express();
const port = 3000;

const logRequest: RequestHandler = (req, res, next) => {
  console.log("LOGGED");
  next();
};

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(logRequest);
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.raw({ inflate: true, type: "text/plain" }));
//app.use(bodyParser.json());

// TODO: change this from /* to whatever the main page is 
app.post("/*", (req, res) => {
  const dafnyCode: string = req.body.toString();
  verifyDafny(dafnyCode).then((result) => {
    const verifyResult = result;
    runDafny(dafnyCode).then((result2) => {

      res.send({verify: verifyResult, output: result2});
    });

  });
});
app.post("/hoare", (request, response) => {
  // assuming request is some java code + precondition and postcondition, of the form:
  // {Precondition as boolean formula} code {Postcondition as boolean formula}
  const triple = request.body.toString();
  const dafnyBinaryPath = "./src/dafny/dafny";
  
  // parse hoare triple into dafny
  const dafnyCode = dafnyParser(triple);

  writeFileSync(__dirname + "/Dafny-Files/dafnyCode.dfy", dafnyCode);
  exec(
    `${dafnyBinaryPath} verify ${__dirname}/Dafny-Files/dafnyCode.dfy`,
    { cwd: "./" },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        response.status(500).send(stderr); // Send compilation error message
        return;
      }

      // Dafny compilation succeeded, send the output back to the frontend
      response.send(stdout);
    }
  );
});


// app.get("/", (req, res) => {
//   //res.send("Hello World!");
//   let responseText = JSON.stringify("Hello World!<br>");
//   res.send(responseText);
// });


// app.get("/test", (request, response) => {
//   response.contentType("application/json");

//   var people = [
//     { name: "Dave", location: "Atlanta" },
//     { name: "Santa Claus", location: "North Pole" },
//     { name: "Man in the Moon", location: "The Moon" },
//   ];

//   var peopleJSON = JSON.stringify(people);
//   response.send(peopleJSON);
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
