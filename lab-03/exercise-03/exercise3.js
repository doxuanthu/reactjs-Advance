const express = require("express");
const router = express.Router();
const fs = require("fs");
const { faker } = require("@faker-js/faker");
const data = require("../exercise-02/data.json");
const foodsCate = require("./food.json");
const electricCate = require("./electric.json");

faker.locale = "vi";

const writeFile = (path, db) => {
  fs.writeFile(path, JSON.stringify(db), (err) => {
    if (err) {
      console.log("[ERROR]", err);
      return;
    }
    console.log("write file successfully");
  });
};

const generateData = (numberOfProduct, product) => {
  const db = [];
  Array.from(new Array(numberOfProduct)).forEach(() => {
    // const product = {};
    db.push(product);
  });

  return db;
};

router.get("/", function (req, res) {
  const electrics = {
    electrics: [
      ...data.products.reduce((acc, curr) => {
        if (curr.category_id === "electric-uuid") {
          acc.push(curr);
        }
        return acc;
      }, []),
    ],
  };
  const foods = {
    foods: [
      ...data.products.reduce((acc, curr) => {
        if (curr.category_id === "food-uuid") {
          acc.push(curr);
        }
        return acc;
      }, []),
    ],
  };

  writeFile("lab-03/exercise-03/electric.json", electrics);
  writeFile("lab-03/exercise-03/food.json", foods);
  res.end();
});

router.get("/demo", function (req, res) {
  res.send("test condition to middleware run...");
});

// generate 100 product into foods category; path: /api/exercise03/foods/generate
router.get("/foods/generate", (req, res) => {
  const product = {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    unit: faker.science.unit(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    category_id: "food-uuid",
  };
  const db = generateData(100, product);
  const foods = {
    foods: [...foodsCate.foods, ...db],
  };
  writeFile("lab-03/exercise-03/food.json", foods);
  res.json(db);
});

// generate 100 product into electrics category; path: /api/exercise03/electrics/generate
router.get("/electrics/generate", (req, res) => {
  const product = {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    category_id: "electric-uuid",
  };
  const db = generateData(100, product);
  const electrics = {
    electrics: [...electricCate.electrics, ...db],
  };
  writeFile("lab-03/exercise-03/electric.json", electrics);
  res.json(db);
});

//get all its categories and products; path: /api/exercise03/categories
router.get("/categories", (req, res) => {
  const db = {
    categories: [...data.categories],
    products: [...foodsCate.foods, ...electricCate.electrics],
  };

  writeFile("lab-03/exercise-03/product.json", db);

  res.json(db);
});

module.exports = router;
