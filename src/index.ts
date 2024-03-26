// src/index.js
import express, { Express, RequestHandler } from "express";
import { exec } from "child_process";
import { writeFileSync } from "fs";
//import fs from "fs";
//import { appendFile } from "node:fs";
// var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");
//const path = require("path");

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

app.post("/*", (req, res) => {
  const dafnyCode = req.body.toString();

  const dafnyBinaryPath = "./src/dafny/dafny"; // Path to your Dafny binary
  const projectRoot = "./"; // Root directory of your project

  // console.log(
  //   `${dafnyBinaryPath} verify ${__dirname}/Dafny-Files/dafnyCode.dfy`
  // );

  writeFileSync(__dirname + "/Dafny-Files/dafnyCode.dfy", dafnyCode);
  exec(
    `${dafnyBinaryPath} verify ${__dirname}/Dafny-Files/dafnyCode.dfy`,
    { cwd: projectRoot },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send(stderr); // Send compilation error message
        return;
      }

      // Dafny compilation succeeded, send the output back to the frontend
      res.send(stdout);
    }
  );
});

app.get("/", (req, res) => {
  //res.send("Hello World!");
  let responseText = JSON.stringify("Hello World!<br>");
  res.send(responseText);
});

app.get("/test", (request, response) => {
  response.contentType("application/json");

  var people = [
    { name: "Dave", location: "Atlanta" },
    { name: "Santa Claus", location: "North Pole" },
    { name: "Man in the Moon", location: "The Moon" },
  ];

  var peopleJSON = JSON.stringify(people);
  response.send(peopleJSON);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
