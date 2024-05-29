const { default: mongoose } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventory = async (req, res) => {
    try {
        const { email, inventoryType } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exists" });
        }

        if (inventoryType == 'in' && user.role !== 'donar') {
            return res.status(400).json({ success: false, message: "Not a donar account" });
        }
        if (inventoryType == 'out' && user.role !== 'hospital') {
            return res.status(400).json({ success: false, message: "Not a hospital" });
        }

        if (inventoryType == 'out') {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId)

            //Calcuate In blood
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'in',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            //Calcuate Out blood
            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'out',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

            //Calcuate In & Out
            const availableQuantityOfBloodGroup = totalIn - totalOut;

            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).json({ success: false, message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup} is available` })
            }
            req.body.hospital = user?._id
        } else req.body.donar = user?._id;
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).json({ success: true, message: "New Blood Recoard Added" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getInventoryController = async (req, res) => {
    try {
        const details = await inventoryModel.find({ organisation: req.body.userId }).populate('donar', '-password').populate('hospital').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", details });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getInventoryHospitalController = async (req, res) => {
    try {
        const details = await inventoryModel.find(req.body.filters).populate('donar', '-password').populate('hospital').populate('organisation').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", details });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getRecentInventory = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation:req.body.userId
        }).limit(3).sort({'createdAt': -1});

        console.log(inventory)
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", inventory });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getDonar = async (req, res) => {
    try {
        const organisation = req.body.userId;

        const donarId = await inventoryModel.distinct("donar", {
            organisation
        });
        const donars = await userModel.find({ _id: { $in: donarId } });
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", donars });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getHospital = async (req, res) => {
    try {
        const organisation = req.body.userId;

        const hospitalId = await inventoryModel.distinct("hospital", {
            organisation
        });
        const hospitals = await userModel.find({ _id: { $in: hospitalId } });
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", hospitals });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getOrganisation = async (req, res) => {
    try {
        const donar = req.body.userId;
        const organisationId = await inventoryModel.distinct("organisation", {
            donar
        });
        const organisations = await userModel.find({ _id: { $in: organisationId } });
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", organisations });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getOrganisationForHospital = async (req, res) => {
    try {
        const hospital = req.body.userId;
        const hospitalId = await inventoryModel.distinct("organisation", {
            hospital
        });
        const hospitals = await userModel.find({ _id: { $in: hospitalId } });
        return res.status(200).json({ success: true, message: "Records Fetched Successfully", hospitals });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { createInventory, getInventoryController, getDonar, getHospital, getOrganisation, getOrganisationForHospital, getInventoryHospitalController, getRecentInventory };