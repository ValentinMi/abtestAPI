const configs = require("../routes/configs.routes");
const pages = require("../routes/pages.routes");
const trackings = require("../routes/trackings.routes");

module.exports = function (app) {
  app.use("/api/configs", configs);
  app.use("/api/pages", pages);
  app.use("/api/trackings", trackings);
};
