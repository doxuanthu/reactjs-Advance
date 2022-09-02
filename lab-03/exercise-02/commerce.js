const express = require("express");
const router = express.Router();
const db = require("./data.json");
const fs = require("fs");

const getproductsByCategory = (cate) => {
  const { id } = db.categories.find((category) => category.name === cate);
  const output = db.products.reduce((acc, prod) => {
    if (prod.category_id === id) {
      acc.push(prod);
    }
    return acc;
  }, []);
  return { [cate]: output };
};

const whiteFile = (categories, products) => {
  const content = {
    categories,
    products,
  };

  fs.writeFile(
    "lab-03/exercise-02/data.json",
    JSON.stringify(content),
    (err) => {
      if (err) {
        console.log("[ERROR]:", err);
        return;
      }
      console.log("write file successfully");
    }
  );
};

const createProduct = (newProduct, category) => {
  const { id } = db.categories.find((cate) => cate.name === category);
  const product = {
    ...newProduct,
    id: db.products.length > 0 ? db.products[db.products.length - 1].id + 1 : 1,
    category_id: id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const categories = [...db.categories];
  const products = [...db.products, product];
  whiteFile(categories, products);
  return product;
};

const updateProduct = (id, data) => {
  const listProduct = db.products.map((product) =>
    product.id === id ? { ...product, ...data, updatedAt: Date.now() } : product
  );
  const categories = [...db.categories];
  const products = listProduct;
  whiteFile(categories, products);
  return products.find((product) => product.id === id);
};

const removeProduct = (id) => {
  const index = db.products.findIndex((product) => product.id === id);
  db.products.splice(index, 1);
  const categories = [...db.categories];
  const products = db.products;
  whiteFile(categories, products);
};

// get all products in foods category; path: /api/products/foods
router.get("/foods", function (req, res) {
  const result = getproductsByCategory("foods");
  res.json(result);
});

// get all products in electric category; path: /api/products/electrics
router.get("/electrics", function (req, res) {
  const result = getproductsByCategory("electrics");
  res.json(result);
});

// Add new product to foods category; path: /api/products/foods/new-product
router.post("/foods/new-product", (req, res) => {
  const product = createProduct(req.body, "foods");

  res.json(product);
});

// Add new product to electric category; path: /api/products/electrics/new-product
router.post("/electrics/new-product", (req, res) => {
  const product = createProduct(req.body, "electrics");

  res.json(product);
});

// Update product of food category; path: /api/products/food/update/:id
router.patch("/food/update/:id", (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  const result = updateProduct(+_id, payload);

  res.json(result);
});

// Update product of electrics category; path: /api/products/electrics/update/:id
router.patch("/electrics/update/:id", (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  const result = updateProduct(+_id, payload);

  res.json(result);
});

// Delete one product to the foods category; path: /api/products/foods/delete/:id
router.delete("/foods/delete/:id", (req, res) => {
  const _id = req.params.id;
  removeProduct(+_id);

  res.json({});
});

// Delete one product to the electrics category; path: /api/products/electrics/delete/:id
router.delete("/electrics/delete/:id", (req, res) => {
  const _id = req.params.id;
  removeProduct(+_id);

  res.json({});
});

// Create a category; path: /api/products/new-category
router.post("/new-category", (req, res) => {
  const category = req.body;

  let listProduct = category?.products
    ? category?.products.reduce((acc, curr) => {
        acc.push({
          ...curr,
          id: Math.floor(Math.random() * 10000).toString(),
          category_id: `${category.name}-uuid`,
          createAt: Date.now(),
          updatedAt: Date.now(),
        });
        return acc;
      }, [])
    : [];

  const categories = [
    ...db.categories,
    {
      name: category.name,
      id: `${category.name.trim().split(" ").join("")}-uuid`,
      createAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
  const products = [...db.products, ...listProduct];
  whiteFile(categories, products);

  res.json({
    [category.name]: [...listProduct],
  });
});

// Delete a category and all products of this category; path: /api/products/delete-category/:id
router.delete("/delete-category/:id", (req, res) => {
  const _id = req.params.id;
  const categories = db.categories.filter((cate) => cate.id !== _id);
  const products = db.products.filter((product) => product.category_id !== _id);

  whiteFile(categories, products);

  res.json({});
});

// update name of category
router.patch("/update-category/:id", (req, res) => {
  const _id = req.params.id;
  const newName = req.body.name;
  const categories = db.categories.map((cate) =>
    cate.id === _id ? { ...cate, name: newName, updatedAt: Date.now() } : cate
  );
  const products = db.products;

  whiteFile(categories, products);

  res.json(categories.find((cate) => cate.id === _id));
});

module.exports = router;
