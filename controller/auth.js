const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const decoded = require("../utils/decoded");
require("dotenv").config();
const regUser = async (req, res) => {
    const { login, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    let checkUser = await User.findOne({ login }).lean();
    if (checkUser) {
        return res.status(500).json({
            msg: "bunday foydalanuvchi mavjud",
        });
    }

    const user = new User({ login, password: hashPass, createdAt: new Date() });

    user.save()
        .then((result) => {
            res.status(201).json({
                msg: "Foydalanuvchi ro`yxatdan o`tdi",
                result,
            });
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
};

const login = async (req, res, next) => {
    const { login, password } = req.body;
    const user = await User.findOne({ login }).lean();
    if (!user) {
        return res.status(500).json({
            msg: "bunday foydalanuvchi yo'q",
        });
    }
    const compareUser = await bcrypt.compare(password, user.password);
    if (!compareUser) {
        return res.status(403).json({
            msg: "parol no'tog'ri",
        });
    }
    let token = jwt.sign({ id: user._id }, process.env.secretKey, {
        expiresIn: "1d",
    });
    delete user.password;
    res.status(200).json({
        msg: "tizimga xush kelibsiz",
        token,
        user,
    });
};
const meFind = async (req, res) => {
    const userID = decoded(req);
    console.log(req);
    let user = await User.findOne({ _id: userID }).lean();
    console.log(req);
    res.json({
        msg: "foydalanuvchi malumotlari",
    });
};
module.exports = {
    regUser,
    login,
    meFind,
};
