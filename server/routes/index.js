const productRouter = require("./productManagement.route");
const storeRouter = require("./storeManagement.route");
const systemRouter = require("./systemManagement.route");

function routes(app) {
  app.use("/api/products", productRouter);
  app.use("/api/store", storeRouter);
  app.use("/api/system", systemRouter);
}

module.exports = routes;
