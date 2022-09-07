const storeRouter = require("./store.route");
const usersRouter = require("./users.route");
const roleRouter = require("./role.route");

function routes(app) {
  // routes for exercise 01
  app.use("/api/store", storeRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/role", roleRouter, (req, res) => {
    res.sendStatus(401);
  });
}

module.exports = routes;
