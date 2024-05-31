const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarList, getHospitalList, getOrganisationList, deleteDonar, deleteHospital, deleteRecord } = require("../controller/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const route = express.Router();

route.get("/donar-list", authMiddleware, adminMiddleware, getDonarList);

route.get("/hospital-list", authMiddleware, adminMiddleware, getHospitalList);

route.get("/org-list", authMiddleware, adminMiddleware, getOrganisationList);

route.delete("/deleteRecord/:id", authMiddleware, adminMiddleware, deleteRecord);

module.exports = route;