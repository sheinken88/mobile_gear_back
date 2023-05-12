const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");

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

db.sync({ force: false })
  .then(function () {
    app.listen(8080, () => console.log("Server listening on port 8080"));
  })
  .catch(console.error);
module.exports = app;
