const usersDB = require("../db/users.json");
const { writeFile } = require("../services");

class UsersController {
  // [GET] path: /api/users/
  getUsers(req, res) {
    res.json(usersDB.users);
  }

  // [GET] path: /api/users/user-role/
  getUsersWithinUserRole(req, res) {
    const _listUser = usersDB.users.filter((user) => user.role_id === 1);

    res.json(_listUser);
  }

  // [GET] path: /api/users/staff-role/
  getUsersWithinStaffRole(req, res) {
    const _listUser = usersDB.users.filter((user) => user.role_id === 2);

    res.json(_listUser);
  }

  // [GET] path: /api/users/admin-role/
  getUsersWithinAdminRole(req, res) {
    const _listUser = usersDB.users.filter((user) => user.role_id === 3);

    res.json(_listUser);
  }

  // [POST] path: /api/users/auth/
  authWithUserAndPassword(req, res) {
    const payload = req.body;
    const _user = usersDB.users.find(
      (user) =>
        user.userName === payload.userName && user.password === payload.password
    );

    res.json(_user || {});
  }

  // [POST] path: /api/users/admin/new-user/
  addUserIntoAdminRole(req, res) {
    const newUser = {
      ...req.body,
      id: usersDB.config.current_user_id + 1,
      role_id: 3,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const data = {
      role_group: usersDB.role_group,
      users: [...usersDB.users, newUser],
      config: {
        current_user_id: newUser.id,
      },
    };

    writeFile("db/users.json", data);

    res.json(newUser);
  }

  // [PATCH] path: /api/users/update/:id
  updateUserInfoById(req, res) {
    const _id = req.params.id;
    const users = usersDB.users.map((user) =>
      user.id === +_id
        ? {
            ...user,
            ...req.body,
            updatedAt: Date.now(),
          }
        : user
    );
    const data = {
      role_group: usersDB.role_group,
      users,
      config: {
        current_user_id: usersDB.users[usersDB.users.length - 1].id,
      },
    };

    writeFile("db/users.json", data);

    res.json(users.find((user) => user.id === +_id));
  }

  // [DELETE] path: /api/users/delete/:id
  deleteUserById(req, res) {
    const _id = req.params.id;
    const index = usersDB.users.findIndex((user) => user.id === +_id);

    console.log(_id, index);

    usersDB.users.splice(index, 1);

    const data = {
      brands: usersDB.role_group,
      users: usersDB.users,
      config: {
        current_user_id: usersDB.users[usersDB.users.length - 1].id,
      },
    };
    writeFile("db/users.json", data);

    res.json({});
  }
}

module.exports = new UsersController();
