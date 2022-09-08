const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");

const { writeFile } = require("../services");
const usersDB = require("../db/users.json");

const usersController = require("../controllers/UsersController");

const roleGroup = [
  {
    id: 1,
    name: "user",
  },
  {
    id: 2,
    name: "staff",
  },
  {
    id: 3,
    name: "admin",
  },
];

const generatesUsers = (numberOfUser) => {
  const users = [];
  Array.from(new Array(numberOfUser)).forEach((user, i) => {
    users.push({
      id: i + 1,
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      full_name: faker.name.fullName(),
      role_id: Math.floor(Math.random() * 3) + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  });
  return users;
};

router.get("/", (req, res, next) => {
  const users = generatesUsers(7);
  const data = {
    role_group: roleGroup,
    users,
    config: {
      current_user_id: usersDB.users[usersDB.users.length - 1].id,
    },
  };

  writeFile("db/users.json", data);
  next();
});

router.get("/", usersController.getUsers);
router.get("/user-role", usersController.getUsersWithinUserRole);
router.get("/staff-role", usersController.getUsersWithinStaffRole);
router.get("/admin-role", usersController.getUsersWithinAdminRole);
router.post("/auth", usersController.authWithUserAndPassword);
router.post("/admin/new-user", usersController.addUserIntoAdminRole);
router.patch("/update/:id", usersController.updateUserInfoById);
router.delete("/delete/:id", usersController.deleteUserById);

module.exports = router;
