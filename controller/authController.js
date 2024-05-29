const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new userModel(req.body);
        await user.save();
        return res.status(200).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const loginController = async (req, res) => {
    try {
        console.log("asfasdfasdfasdfasdfasdfsad");
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (!existingUser) {
            console.log("data getting here");
            return res.status(402).json({ success: false, message: "User Not Found" });
        }
        if (existingUser.role !== req.body.role) {
            return res.status(500).json({ success: false, message: "Role doesn't match" });
        }
        const comparePassword = await bcrypt.compare(req.body.password, existingUser.password);
        if (!comparePassword) {
            return res.status(500).json({ success: false, message: "Invalid Credentials" })
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(201).json({ success: true, message: "Login Successful", token, existingUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const currUser = async (req, res) => {
    try {
        console.log(req.body.userId);
        const user = await userModel.findOne({ _id: req.body.userId });
        return res.status(200).json({ success: true, message: "User Fetched", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { registerController, loginController, currUser };