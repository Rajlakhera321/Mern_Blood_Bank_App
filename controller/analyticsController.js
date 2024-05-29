const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose")

const bloodGroupDetails = async (req, res) => {
    try {
        const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);

        //Count Total In
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'in',
                        organisation
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            //Count Total Out
            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'out',
                        organisation
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            //Calculate available blood
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

            bloodGroupData.push({
                bloodGroup,
                totalIn: (totalIn[0]?.total || 0),
                totalOut: (totalOut[0]?.total || 0),
                availableBlood
            })
        }))
        return res.status(200).json({
            success: true,
            message: "Blood Group Data Fetch Successfully",
            bloodGroupData,

        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = { bloodGroupDetails };