const { faker } = require("@faker-js/faker");

const db = require("../db/products.json");

class ProductsController {
  // [GET] path: /api/products
  getProducts(req, res) {
    res.json(db);
  }

  // [GET] path: /api/products/:id
  getProductById(req, res) {
    const { id } = req.params;
    res.json(db.find((entity) => entity.id === id) || {});
  }

  // [GET] path: /api/products/first
  getFistProduct(req, res) {
    res.json(db[0]);
  }

  // [GET] path: /api/products/last
  getLastProduct(req, res) {
    res.json(db[db.length - 1]);
  }
}
module.exports = new ProductsController();
