const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const db = require("../firebase/realTimeDB");

const ref = db.ref("/system");
const categoriesRef = ref.child("categories");
const brandsRef = ref.child("brands");
const productsRef = ref.child("products");
const roleRef = ref.child("role");
const userRef = ref.child("users");
const jwtSecret = "dbvhbfjvbfjvbdjkfvbd";

const { formatData } = require("../services/services");

ref.on(
  "value",
  (snapshot) => {
    console.log(snapshot.val());
  },
  (errorObject) => {
    console.log("The read failed: " + errorObject.name);
  }
);

async function findUser(username, password) {
  const listUser = await userRef.once("value", (snapshot) => {});
  return formatData(listUser.val()).find(
    (user) => user.username === username && user.password === password
  );
}

// [POST] path: /api/system/auth
router.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const currentUser = await findUser(username, password);
  console.log(username, password);
  console.log(currentUser);
  if (currentUser) {
    const { username, password, key } = currentUser;
    return res.json({
      token: jsonwebtoken.sign({ username, password, key }, jwtSecret),
      curr_user: { username, key },
    });
  }
  res.status(401).send("Unauthorized");
});

// [POST] path: /api/system/users/new
router.post("/users/new", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  userRef.push().set({
    ...req.body,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    role_id: "-NBT9Jhi6RO7dyuHComi",
  });

  res.status(201).send("Create Successful!");
});

router.use(jwt({ secret: jwtSecret, algorithms: ["HS256"] }));

router.use((err, req, res, next) => {
  res.status(403).send("Unauthentication!!");
});

// [GET] path: /api/system/products
router.get("/products", async (req, res) => {
  const products = await productsRef.once("value", function (snapshot) {});
  res.json(formatData(products.val()));
});

// [PATCH] path: /api/system/users/update/:id
router.patch("/users/update/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.statusCode(403);
    return;
  }
  const payload = req.body;
  const userUpdate = userRef.child(id);
  userUpdate.update({
    ...payload,
    updatedAt: Date.now(),
  });
  const _users = await userRef.once("value", function (snapshot) {});
  res.send(_users.val()[id]);
});

module.exports = router;
