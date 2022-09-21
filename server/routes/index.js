const systemRouter = require("./systemManagement.route");

function routes(app) {
  app.use("/api/system", systemRouter);
}

module.exports = routes;
