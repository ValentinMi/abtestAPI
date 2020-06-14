const configs = require("../routes/configs.routes");
const pages = require("../routes/pages.routes");

module.exports = function (app) {
  app.use("/api/configs", configs);
  app.use("/api/pages", pages);
};
