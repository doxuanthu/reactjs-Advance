const systemRouter = require("./systemManagement.route");
const productsRouter = require("./productManagement.route");

function routes(app) {
  app.use("/api/system", systemRouter);
  app.use("/api/products", productsRouter);
}

module.exports = routes;
