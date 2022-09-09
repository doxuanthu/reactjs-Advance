const express = require("express");
const router = express.Router();

const db = require("../firebase/realTimeDB");

const ref = db.ref("/products");
const productsRef = ref.child("products");

ref.on(
  "value",
  (snapshot) => {
    console.log(snapshot.val());
  },
  (errorObject) => {
    console.log("The read failed: " + errorObject.name);
  }
);

// [GET] path: /api/products
router.get("/", async (req, res) => {
  const listProduct = await ref.once("value", function (snapshot) {});

  res.json(listProduct);
});

// [POST] path: /api/products/new-product
router.post("/new-product", (req, res) => {
  const payload = req.body;
  productsRef.push().set({
    ...payload,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
});

// [PATCH] path: /api/products/update
router.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updateRef = productsRef.child(id);
  updateRef.update({
    ...payload,
    updatedAt: Date.now(),
  });
});

module.exports = router;
