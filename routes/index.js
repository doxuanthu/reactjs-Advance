const productsRouter = require("./products.route");
const calculatorRouter = require("./calculator.route");

function routes(app) {
  app.use("/api/calculator", calculatorRouter);
  app.use("/api/products", productsRouter);
}

module.exports = routes;
