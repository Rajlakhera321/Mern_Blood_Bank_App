const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    role: {
        type: Schema.Types.String,
        require: [true, 'role is required'],
        enum: ['admin', 'organisation', 'donar', 'hospital',]
    },
    name: {
        type: Schema.Types.String,
        require: function () {
            if (this.role === 'donar' || this.role === 'admin') return true;
            return false;
        }
    },
    organisationName: {
        type: Schema.Types.String,
        require: function () {
            if (this.role === 'organization') return true;
            return false;
        }
    },
    hospitalName: {
        type: Schema.Types.String,
        require: function () {
            if (this.role === 'hospital') return true;
            return false;
        }
    },
    email: {
        type: Schema.Types.String,
        require: [true, 'email is required'],
        unique: true
    },
    password: {
        type: Schema.Types.String,
        require: [true, 'password is required'],
    },
    website: {
        type: Schema.Types.String
    },
    address: {
        type: Schema.Types.String,
        require: [true, 'address is required']
    },
    phone: {
        type: Schema.Types.String,
        require: [true, 'phone number is required']
    }
}, { timestamps: true });

module.exports = model('user', userSchema);