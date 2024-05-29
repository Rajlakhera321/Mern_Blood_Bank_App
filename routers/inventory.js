const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventory, getInventoryController, getDonar, getHospital, getOrganisation, getOrganisationForHospital, getInventoryHospitalController, getRecentInventory } = require("../controller/inventoryController");
const route = express.Router();

route.post("/create-inventory", authMiddleware, createInventory);

route.get("/getInventoryDetails", authMiddleware, getInventoryController);

route.get("/getDonars", authMiddleware, getDonar);

route.get("/getHospitals", authMiddleware, getHospital);

route.get("/getOrganisations", authMiddleware, getOrganisation);

route.get("/getOrgForHospital", authMiddleware, getOrganisationForHospital);

route.post("/getInventoryHospital", authMiddleware, getInventoryHospitalController);

route.get("/getRecentInventory", authMiddleware, getRecentInventory);

module.exports = route;