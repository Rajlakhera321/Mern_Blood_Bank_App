const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventory, getInventoryController } = require("../controller/inventoryController");
const route = express.Router();

route.post("/create-inventory", authMiddleware, createInventory);

route.get("/getInventoryDetails", authMiddleware, getInventoryController);

module.exports = route;