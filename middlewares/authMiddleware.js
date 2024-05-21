const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_SECRET, (err,decode) =>{
            if(err) return res.status(401).json({success: false, message: "Auth Failed", err});
            req.body.userId = decode.userId; 
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: "Auth Failed" })
    }
}