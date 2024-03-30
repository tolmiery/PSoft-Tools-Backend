// src/index.js
import express, { Express, RequestHandler } from "express";
import runDafny from "./runDafny";

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

app.post("/*", (req, res) => {
  const dafnyCode: string = req.body.toString();
  runDafny(dafnyCode).then((result) => {
    res.send(result);
  });
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
