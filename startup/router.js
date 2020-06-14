const configs = require("../routes/configs.routes");
const pages = require("../routes/pages.routes");

module.exports = function (app) {
  app.use("/configs", configs);
  app.use("/pages", pages);
};
