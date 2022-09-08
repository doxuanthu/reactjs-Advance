const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./routes");

const path = require("path");
const public = path.join(__dirname, "public");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/file", function (req, res, next) {
  const { name } = req.query;
  res.sendFile(path.join(public, "", name));
});

app.post("/file", (req, res) => {
  const { name, content } = req.query;
  fs.writeFile(
    `public/rources/data/${name}.txt`,
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

app.post("/folder", (req, res) => {
  const { name } = req.query;
  fs.mkdir(`public/${name}`, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory created successfully!");
  });
});

app.put("/file", (req, res) => {
  const oldname = "public/rources/data/" + req.query.oldname;
  const newname = "public/rources/data/" + req.query.newname;

  fs.rename(oldname, newname, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully renamed the file.");
    }
  });
});

app.put("/folder", (req, res) => {
  const oldfolder = "public/" + req.query.oldfolder;
  const newfolder = "public/" + req.query.newfolder;

  fs.rename(oldfolder, newfolder, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully renamed the directory.");
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// initial routes
routes(app);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
