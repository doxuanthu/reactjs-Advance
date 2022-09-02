const express = require("express");
var cors = require("cors");
const students = require("./lab-03/exercise-01/students");
const products = require("./lab-03/exercise-02/commerce");
const exercise03 = require("./lab-03/exercise-03/exercise3");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Exercise 01
app.use("/api/students", students);

// Exercise 02
app.use("/api/products", products);

// Exercise 03
app.use("/api/exercise03", exercise03);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
