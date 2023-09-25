const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const { homeRouter } = require("./routes/home");
const { configuratorRouter } = require("./routes/configurator");
const { orderRouter } = require("./routes/order");
const { join } = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.static("public"));
app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials",
  }),
);
app.use("/", homeRouter);
app.use("/configurator", configuratorRouter);
app.use("/order", orderRouter);

app.listen(3001, "localhost");
