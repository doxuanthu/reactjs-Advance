const express = require("express");
const router = express.Router();

const usersDB = require("../db/users.json");
const storeDB = require("../db/store.json");
const roleController = require("../controllers/RoleController");

router.use((req, res, next) => {
  const authInfo = req.query || req.body;
  if (!authInfo) {
    return next("router");
  }
  next();
});

function withinRoleUser(req, res, next) {
  const authInfo = req.query || req.body;
  const _user = usersDB.users.find(
    (user) =>
      user.userName === authInfo.userName && user.password === authInfo.password
  );
  if (!_user || _user.role_id !== 1) {
    res.status(403).send("Unauthorized");
    return;
  } else {
    next();
  }
}

function withinRoleStaff(req, res, next) {
  const authInfo = req.query || req.body;
  const _user = usersDB.users.find(
    (user) =>
      user.userName === authInfo.userName && user.password === authInfo.password
  );
  if (!_user || _user.role_id !== 2) {
    res.status(403).send("Unauthorized");
    return;
  } else {
    next();
  }
}

function withinRoleAdmin(req, res, next) {
  const authInfo = req.query || req.body;
  const _user = usersDB.users.find(
    (user) =>
      user.userName === authInfo.userName && user.password === authInfo.password
  );
  if (!_user || _user.role_id !== 3) {
    res.status(403).send("Unauthorized");
    return;
  } else {
    next();
  }
}

router.get("/user/products", withinRoleUser, roleController.getProducts);
router.get(
  "/user/brands/:brand",
  withinRoleUser,
  roleController.listProductsByBrand
);
router.get(
  "/user/categories/:category",
  withinRoleUser,
  roleController.listProductsByCategory
);
router.get(
  "/user/products/:id",
  withinRoleUser,
  roleController.findProductById
);

router.post("/staff/new-brand", withinRoleStaff, roleController.addNewBrand);
router.post(
  "/staff/new-category",
  withinRoleStaff,
  roleController.addNewCategory
);
router.post(
  "/staff/new-product",
  withinRoleStaff,
  roleController.addNewProduct
);

router.patch(
  "/staff/update-brand/:id",
  withinRoleStaff,
  roleController.updateBrandById
);

router.patch(
  "/staff/update-category/:id",
  withinRoleStaff,
  roleController.updateCategoryById
);

router.patch(
  "/staff/update-product/:id",
  withinRoleStaff,
  roleController.updateProductInfoById
);

router.delete(
  "/staff/delete-brand/:id",
  withinRoleStaff,
  roleController.deleteABrand
);

router.delete(
  "/staff/delete-category/:id",
  withinRoleStaff,
  roleController.deleteACategory
);

router.delete(
  "/staff/delete-product/:id",
  withinRoleStaff,
  roleController.deleteAProduct
);

router.patch(
  "/admin/update-user/:id",
  withinRoleAdmin,
  roleController.updateUserInfoById
);

router.post("/admin/new-user", withinRoleAdmin, roleController.addNewUser);

router.delete(
  "/admin/delete-user/:id",
  withinRoleAdmin,
  roleController.deleteUserById
);

router.get("/admin/users/:id", withinRoleAdmin, roleController.findUserById);

router.get("/admin/users", withinRoleAdmin, roleController.getUsers);

module.exports = router;
