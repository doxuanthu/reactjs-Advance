const express = require("express");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./routes");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// initial routes
routes(app);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
