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
    origin: "https://mobile-gear-front.vercel.app/",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", routes);

const force = false;

db.sync({ force })
  .then(function () {
    if (force) {
      seeder();
    }
    app.listen(process.env.POSTGRES_URL || 8080, () =>
      console.log("Server listening on port", process.env.PORT || 8080)
    );
  })
  .catch(console.error);

module.exports = app;
