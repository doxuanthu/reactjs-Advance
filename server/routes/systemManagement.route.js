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
    // console.log(snapshot.val());
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
    const { username, password, role_id } = currentUser;
    return res.json({
      token: jsonwebtoken.sign({ username, password, role_id }, jwtSecret),
      curr_user: { username, password, role_id },
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

router.get("/test", (req, res) => {
  res.send("home");
});

router.use((err, req, res, next) => {
  res.status(403).send("Unauthentication!!");
});

// async function customersRights(req, res, next) {
//   const role_id = "-NBT9Jhi6RO7dyuHComi";
//   const user = await findUser(req.query.key);
//   if (!user || user?.["role_id"] !== role_id) {
//     res.status(401).send("Unauthorized!");
//     return;
//   }
//   next();
// }

// async function staffRights(req, res, next) {
//   const role_id = "-NBT9OmzkbhkX6kxwR0y";
//   const user = await findUser(req.query.key);
//   if (!user || user?.["role_id"] !== role_id) {
//     res.status(401).send("Unauthorized!");
//     return;
//   }
//   next();
// }

// async function adminRights(req, res, next) {
//   const role_id = "-NBT9QUihzYRLnOnRwGf";
//   const user = await findUser(req.query.key);
//   if (!user || user?.["role_id"] !== role_id) {
//     res.status(401).send("Unauthorized!");
//     return;
//   }
//   next();
// }

// [GET] path: /api/system/products?key={user_key}
// router.get("/products", customersRights, async (req, res) => {
//   const products = await productsRef.once("value", function (snapshot) {});
//   res.json(products.val());
// });

// // [GET] path: /api/system/products/filter?key={user_key}&name={brand_name}
// router.get("/products/filter", customersRights, async (req, res) => {
//   const { name } = req.query;
//   const _brands = await brandsRef.once("value", function (snapshot) {});
//   let _brand_id = "";
//   for (const key in _brands.val()) {
//     if (_brands.val()[key]["name"] === name) {
//       _brand_id = key;
//     }
//   }
//   const products = await productsRef.once("value", function (snapshot) {});
//   let _products = [];
//   for (const key in products.val()) {
//     if (products.val()[key]["brand_id"] === _brand_id) {
//       _products.push(products.val()[key]);
//     }
//   }
//   res.json(_products);
// });

// // [GET] path: /api/system/products/filter-cate?key={user_key}&name={cate_name}
// router.get("/products/filter-cate", customersRights, async (req, res) => {
//   const { name } = req.query;
//   let cate_key = "";
//   categoriesRef.orderByChild("name").on("child_added", (snapshot) => {
//     if (snapshot.val().name === name) {
//       cate_key = snapshot.key;
//     }
//   });
//   const _products = {};
//   productsRef.orderByValue().on("value", (snapshot) => {
//     snapshot.forEach((data) => {
//       if (data.val().category_id === cate_key) {
//         _products[data.key] = data.val();
//       }
//     });
//   });
//   console.log(_products);
//   res.json(_products);
// });

// // [GET] path: /api/system/products/:id?key={user_key}
// router.get("/products/:id", customersRights, async (req, res) => {
//   const { id } = req.params;
//   const _products = await productsRef.once("value", function (snapshot) {});

//   res.json(_products.val()[id] || {});
// });

// // [POST] path: /api/system/brands/new
// router.post("/brands/new", staffRights, (req, res) => {
//   const payload = req.body;
//   brandsRef.push().set({
//     ...payload,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   });
// });

// [POST] path: /api/system/categories/new
// router.post("/categories/new", staffRights, (req, res) => {
//   const payload = req.body;
//   categoriesRef.push().set({
//     ...payload,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   });
// });

// // [POST] path: /api/system/products/new?key={user_key}
// router.post("/products/new", staffRights, (req, res) => {
//   const payload = req.body;
//   productsRef.push().set({
//     ...payload,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   });
// });

// // [PATCH] path: /api/system/brands/update?key={user_key}
// router.patch("/brands/update/:id", staffRights, (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const updateRef = brandsRef.child(id);
//   updateRef.update({
//     ...payload,
//     updatedAt: Date.now(),
//   });
// });

// // [PATCH] path: /api/system/categories/update?key={user_key}
// router.patch("/categories/update/:id", staffRights, (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const updateRef = categoriesRef.child(id);
//   updateRef.update({
//     ...payload,
//     updatedAt: Date.now(),
//   });
// });

// // [PATCH] path: /api/system/products/update?key={user_key}
// router.patch("/products/update/:id", staffRights, (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const updateRef = productsRef.child(id);
//   updateRef.update({
//     ...payload,
//     updatedAt: Date.now(),
//   });
// });

// // [DELETE] path: /api/system/brands/remove?key={user_key}
// router.delete("/brands/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const removeRef = brandsRef.child(id);
//   removeRef.remove((err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("brand deleted!");
//   });
// });

// // [DELETE] path: /api/system/categories/remove?key={user_key}
// router.delete("/categories/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const removeRef = categoriesRef.child(id);
//   removeRef.remove((err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("category deleted!");
//   });
// });

// // [DELETE] path: /api/system/products/remove?key={user_key}
// router.delete("/categories/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const removeRef = productsRef.child(id);
//   removeRef.remove((err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("product deleted!");
//   });
// });

// router.patch("/users/update/:id", adminRights, async (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const userUpdate = userRef.child(id);
//   userUpdate.update({
//     ...payload,
//     updatedAt: Date.now(),
//   });
//   const _users = await userRef.once("value", function (snapshot) {});
//   res.send(_users.val()[id]);
// });

// // [POST] path: /api/system/users/new
// router.post("/users/new", (req, res) => {
//   const payload = req.body;
//   userRef.push().set({
//     ...payload,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   });
// });

// [POST] path: /api/system/role/new
// router.post("/role/new", (req, res) => {
//     const payload = req.body;
//     roleRef.push().set({
//       ...payload,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     });
//   });

module.exports = router;
