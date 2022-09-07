const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");

const { writeFile } = require("../services");
const storeController = require("../controllers/StoreController");

const generatesBrands = (n) => {
  const output = [];
  Array.from(new Array(n)).forEach((_, i) => {
    output.push({
      id: faker.datatype.uuid(),
      name: `brands_name ${i + 1}`,
    });
  });
  return output;
};

const generatesCategories = (n) => {
  const output = [];
  Array.from(new Array(n)).forEach((_, i) => {
    output.push({
      id: faker.datatype.uuid(),
      name: `category_name ${i + 1}`,
    });
  });
  return output;
};

const generatesProducts = (categories, brands, numberOfProduct) => {
  const products = [];
  for (cate of categories) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category_id: cate.id,
        brand_id: brands[Math.floor(Math.random() * brands.length)]?.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });
  }
  return products;
};

const formatcategories = (categories, prod) => {
  return categories.map((cate) => {
    return {
      ...cate,
      products: prod.filter((item) => item.category_id === cate.id),
    };
  });
};

router.get("/", (req, res, next) => {
  const brands = generatesBrands(3);
  const categories = generatesCategories(2);
  const products = generatesProducts(categories, brands, 2);

  const data = {
    brands,
    categories: formatcategories(categories, products),
  };
  writeFile("db/store.json", data);
  next();
});

router.use(
  (req, res, next) => {
    console.log("[Request Time]: ", Date.now());
    console.log("[Request method]:", req.method);
    console.log("[Request path]:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    res.set({
      "Status-Code": 200,
      "Content-Type": "application/json",
    });
    next();
  }
);

router.get("/brands/:id", storeController.getBrandById);
router.get("/brands", storeController.getBrands);

router.get("/categories/:id", storeController.getcategoryById);
router.get("/categories", storeController.getcategories);

router.get("/products/:id", storeController.getProductsById);
router.get("/products", storeController.getProducts);

router.get(
  "/brands/:id/products",
  storeController.findProductsWithinBrandsByBrandId
);

router.get(
  "/categories/:id/products",
  storeController.findProductsWithinCategoryByCateId
);

router.post("/new-product", storeController.createNewProduct);

router.put("/update-product/:id", storeController.updateProduct);

router.delete("/delete-product/:id", storeController.deleteProduct);

module.exports = router;
