const fs = require("fs");
const { faker } = require("@faker-js/faker");

const writeFile = (path, data) => {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.log("[ERROR]: ", err);
      return;
    }
    console.log("writeFile successfully !!");
  });
};

module.exports = { writeFile };
