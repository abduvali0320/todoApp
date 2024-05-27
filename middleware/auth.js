const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ").at(1);
        const decoded = jwt.verify(token, process.env.secretKey);
        next();
    } catch (e) {
        return res.status(403).json({
            msg: "tizimga kirishda muammo bor",
            error: e,
        });
    }
};

module.exports = {
    auth,
};
