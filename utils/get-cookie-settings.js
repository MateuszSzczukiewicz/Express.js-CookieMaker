const { getAddonsFromRequest } = require("./get-addons-from-request");
const { handlebarsHelpers } = require("./handlebars-helpers");
const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");

export function getCookieSettings(req) {
  const { cookieBase: base } = req.cookies;

  const addons = getAddonsFromRequest(req);

  const allBases = Object.entries(COOKIE_BASES);
  const allAddons = Object.entries(COOKIE_ADDONS);

  const sum =
    (base ? handlebarsHelpers.findPrice(allBases, base) : 0) +
    addons.reduce(
      (prev, curr) => prev + handlebarsHelpers.findPrice(allAddons, curr),
      0,
    );

  return {
    addons,
    base,
    sum,
    allBases,
    allAddons,
  };
}

module.exports = {
  getCookieSettings,
};
