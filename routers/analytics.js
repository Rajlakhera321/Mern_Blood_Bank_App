const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { bloodGroupDetails } = require("../controller/analyticsController");
const route = express.Router();

route.get("/bloodDetailsData", authMiddleware, bloodGroupDetails);

module.exports = route;