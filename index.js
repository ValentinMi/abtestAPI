require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

require("./startup/database")();
require("./startup/router")(app);
require("./startup/cors")(app);

const port = process.env.PORT;

app.listen(port || 5000, console.log(`Server is listening on port ${port}`));
