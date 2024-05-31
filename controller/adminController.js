const userModel = require("../models/userModel")

const getDonarList = async (req, res) => {
    try {
        console.log("data getting here")
        const donar = await userModel.find({ role: 'donar' }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, Totalcount: donar.length, message: "Donar list fetched successfully", donar });
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getHospitalList = async (req, res) => {
    try {
        const hospital = await userModel.find({ role: 'hospital' }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, Totalcount: hospital.length, message: "Hospital list fetched successfully", hospital });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const getOrganisationList = async (req, res) => {
    try {
        const organisation = await userModel.find({ role: 'organisation' }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, Totalcount: organisation.length, message: "Organisation list fetched successfully", organisation });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const deleteRecord = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: "Record Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = { getDonarList, getHospitalList, getOrganisationList, deleteRecord }