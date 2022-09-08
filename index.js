const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path");
const public = path.join(__dirname, "public");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Exercise 01
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.post("/", (req, res) => {
  res.send("Hello POST method");
});

app.put("/", (req, res) => {
  res.send("Hello PUT method");
});

app.delete("/", (req, res) => {
  res.send("Hello DELETE method");
});

// Exercise 02
app.get("/chia", (req, res, next) => {
  const { a, b } = req.query;
  if (+b === 0) {
    res.status(400).send("Loi chia 0");
    return;
  }
  next();
});

app.get("/cong", (req, res) => {
  const { a, b } = req.query;
  res.send(`${a} + ${b} = ${+a + +b}`);
});

app.get("/tru", (req, res) => {
  const { a, b } = req.query;
  res.send(`${a} - ${b} = ${+a - +b}`);
});

app.get("/nhan", (req, res) => {
  const { a, b } = req.query;
  res.send(`${a} * ${b} = ${a * b}`);
});

app.get("/chia", (req, res) => {
  const { a, b } = req.query;
  res.send(`${a} / ${b} = ${a / b}`);
});

// Exercise 03
app.get("/file", function (req, res, next) {
  const { fileName } = req.query;
  res.sendFile(path.join(public, "", fileName));
});

app.post("/createFile", (req, res) => {
  const { fileName, content } = req.query;
  fs.writeFile(
    `public/rources/data/${fileName}.txt`,
    JSON.stringify(content),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("write file successfully");
    }
  );
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
