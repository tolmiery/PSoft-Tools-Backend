// src/index.js
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

const app: Express = express();
const port = 3000;

const logRequest: RequestHandler = (req, res, next) => {
  console.log("LOGGED");
  next();
};

app.use(logRequest);
app.use(express.json());

app.post("/*", (req, res) => {
  req.body; // JavaScript object containing the parse JSON
  //res.json(req.body);

  var peopleJSON = JSON.stringify(req.body);
  res.send(peopleJSON);
});

app.get("/", (req, res) => {
  //res.send("Hello World!");
  let responseText = "Hello World!<br>";
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
