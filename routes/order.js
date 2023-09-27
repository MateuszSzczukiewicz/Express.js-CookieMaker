const express = require("express");
const { getAddonsFromRequest } = require("../utils/get-addons-from-request");
const { handlebarsHelpers } = require("../utils/handlebars-helpers");
const { COOKIE_BASES, COOKIE_ADDONS } = require("../data/cookies-data");

const orderRouter = express.Router();

orderRouter.get("/summary", (req, res) => {
  const { cookieBase } = req.cookies;

  const addons = getAddonsFromRequest(req);

  const sum =
    (cookieBase
      ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
      : 0) +
    addons.reduce(
      (prev, curr) =>
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr),
      0,
    );

  res.render("order/summary", {
    cookie: {
      base: "light",
      addons,
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  orderRouter,
};
