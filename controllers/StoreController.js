const storeDB = require("../db/store.json");
const { faker } = require("@faker-js/faker");

const { writeFile } = require("../services");

class StoreController {
  // [GET] path: /api/store/brands
  getBrands(req, res) {
    res.json(storeDB["brands"]);
  }

  // [GET] path: /api/store/brands/:id
  getBrandById(req, res) {
    const _id = req.params.id;
    const _brand = storeDB.brands.find((brand) => brand.id === _id);
    res.json(_brand || {});
  }

  // [GET] path: /api/store/categories
  getcategories(req, res) {
    res.json(storeDB["categories"]);
  }

  // [GET] path: /api/store/categories/:id
  getcategoryById(req, res) {
    const _id = req.params.id;
    const _category = storeDB.categories.find(
      (category) => category.id === _id
    );
    res.json(_category || {});
  }

  //   All products
  static getAllProducts(categories) {
    return categories.reduce((products, curr) => {
      products = products.concat(curr.products);
      return products;
    }, []);
  }

  // [GET] path: /api/store/products
  getProducts(req, res) {
    const _products = StoreController.getAllProducts(storeDB.categories);
    res.json(_products);
  }

  // [GET] path: /api/store/products/:id
  getProductsById(req, res) {
    const _id = req.params.id;
    const _products = StoreController.getAllProducts(storeDB.categories);
    const _product = _products.find((prod) => prod.id === _id);
    res.json(_product || {});
  }

  // [GET] path: /api/store/brands/:id/products
  findProductsWithinBrandsByBrandId(req, res) {
    const _id = req.params.id;
    const _products = StoreController.getAllProducts(storeDB.categories);

    const _list = _products.filter((prod) => prod.brand_id === _id);

    res.json(_list || []);
  }

  // [GET] path: /api/store/categories/:id/products
  findProductsWithinCategoryByCateId(req, res) {
    const _id = req.params.id;
    const _products = StoreController.getAllProducts(storeDB.categories);

    const _list = _products.filter((prod) => prod.category_id === _id);

    res.json(_list || []);
  }

  // [POST] path: /api/store/new-product
  createNewProduct(req, res) {
    const payload = req.body;
    const _product = {
      ...payload,
      id: faker.datatype.uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const _categories = storeDB.categories.map((cate) =>
      cate.id === _product.category_id
        ? { ...cate, products: [...cate.products, _product] }
        : cate
    );

    const data = {
      brands: storeDB.brands,
      categories: _categories,
    };

    writeFile("db/store.json", data);

    res.json(_product);
  }

  // [PUT] path: /api/store/update-product/:id
  updateProduct(req, res) {
    const _id = req.params.id;
    const payload = req.body;

    let _products = StoreController.getAllProducts(storeDB.categories);
    _products = _products.map((product) =>
      product.id === _id
        ? { ...product, ...payload, updatedAt: Date.now() }
        : product
    );
    const data = {
      brands: storeDB.brands,
      categories: storeDB.categories.map((cate) => ({
        ...cate,
        products: _products.filter((prod) => prod.category_id === cate.id),
      })),
    };
    writeFile("db/store.json", data);

    res.json(_products.find((prod) => prod.id === _id));
  }

  // [DELETE] path: /api/store/delete-product/:id
  deleteProduct(req, res) {
    const _id = req.params.id;
    let _products = StoreController.getAllProducts(storeDB.categories);
    const index = _products.findIndex((prod) => prod.id === _id);

    _products.splice(index, 1);

    const data = {
      brands: storeDB.brands,
      categories: storeDB.categories.map((cate) => ({
        ...cate,
        products: _products.filter((prod) => prod.category_id === cate.id),
      })),
    };
    writeFile("db/store.json", data);

    res.json({});
  }
}

module.exports = new StoreController();
