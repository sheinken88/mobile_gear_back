const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");
const seeder = require("./seed");
require("dotenv").config({ path: ".env.development.local" });

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", routes);

const force = false;

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    return db.sync({ force });
  })
  .then(() => {
    if (force) {
      seeder();
    }
    app.listen(process.env.PORT || 8080, () =>
      console.log("Server listening on port", process.env.PORT || 8080)
    );
  })
  .catch(console.error);

module.exports = app;
