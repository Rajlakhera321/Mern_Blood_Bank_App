const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
    inventoryType: {
        type: String,
        require: [true, 'inventory type required'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        require: [true, 'blood group type required'],
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity: {
        type: Number,
        require: [true, 'blood quantity is required']
    },
    email: {
        type: String,
        reqire: [true, "Donar email is required"]
    },
    organisation: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: [true, 'organisation is required']
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: function () {
            return this.inventoryType == "out"
        }
    },
    donar: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: function () {
            return this.inventoryType == "in"
        }
    }
}, { timestamps: true });

module.exports = model("Inventory", inventorySchema);