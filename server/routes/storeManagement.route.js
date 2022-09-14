const express = require("express");
const router = express.Router();
const db = require("../firebase/realTimeDB");
const { formatData } = require("../services/services");

const ref = db.ref("/store");
const categoriesRef = ref.child("categories");
const brandsRef = ref.child("brands");

ref.on(
  "value",
  (snapshot) => {
    console.log(snapshot.val());
  },
  (errorObject) => {
    console.log("The read failed: " + errorObject.name);
  }
);

// [GET] path: /api/store/categories
router.get("/categories", async (req, res) => {
  const listCategories = await categoriesRef.once(
    "value",
    function (snapshot) {}
  );

  res.json(formatData(listCategories.val()));
});

// [POST] path: /api/store/categories/new
router.post("/categories/new", (req, res) => {
  const payload = req.body;
  categoriesRef.push().set({
    ...payload,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
});

// [PATCH] path: /api/store/categories/update
router.patch("/categories/update/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updateRef = categoriesRef.child(id);
  updateRef.update({
    ...payload,
    updatedAt: Date.now(),
  });
});

// [DELETE] path: /api/store/categories/remove
router.delete("/categories/remove/:id", (req, res) => {
  const { id } = req.params;
  const removeRef = categoriesRef.child(id);
  removeRef.remove((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("category deleted!");
  });
  res.status(200).send("category deleted!");
});

// [GET] path: /api/store/categories/:id
router.get("/categories/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const listCategories = await categoriesRef.once(
    "value",
    function (snapshot) {}
  );
  res.json(listCategories.val()[id] || {});
});

// [GET] path: /api/store/brands
router.get("/brands", async (req, res) => {
  const listBrands = await brandsRef.once("value", function (snapshot) {});

  res.json(formatData(listBrands.val()));
});

// [POST] path: /api/store/brands/new
router.post("/brands/new", (req, res) => {
  const payload = req.body;
  brandsRef.push().set({
    ...payload,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
});

// [PATCH] path: /api/store/brands/update
router.patch("/brands/update/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updateRef = brandsRef.child(id);
  updateRef.update({
    ...payload,
    updatedAt: Date.now(),
  });
});

// [GET] path: /api/store/brands/:id
router.get("/brands/:id", async (req, res) => {
  const { id } = req.params;
  const brands = await brandsRef.once("value", function (snapshot) {});
  res.json(brands.val()[id] || {});
});

// [DELETE] path: /api/store/brands/remove/:id
router.delete("/brands/remove/:id", (req, res) => {
  const { id } = req.params;
  const removeRef = brandsRef.child(id);
  removeRef.remove((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("brand deleted!");
  });
  res.status(200).send("brand deleted!");
});

module.exports = router;
