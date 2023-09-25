const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => req.render("home/index"));

module.exports = {
  homeRouter,
};
