const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");

const { writeFile } = require("../services");
const productsController = require("../controllers/ProductsController");

const generateProducts = (n) => {
  const products = [];

  Array.from(new Array(n)).forEach((product) => {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  });

  return products;
};

router.get("/", (req, res, next) => {
  const data = generateProducts(6);
  writeFile("db/products.json", data);
  next();
});

router.get("/", productsController.getProducts);
router.get("/first", productsController.getFistProduct);
router.get("/last", productsController.getLastProduct);
router.get("/:id", productsController.getProductById);

module.exports = router;
