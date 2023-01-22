const { Op } = require("sequelize");
// const { sequelize } = require("../models");
const db = require("../models");

const User = db.user

enableLog = async (req, res, next) => {

    try {
        const { user } = req.body
        await User.findOne({
            where: {
                [Op.and]: [
                    { username: user },
                    { enableLog: true }
                ]
            }
        }).then(user => {
            if (user) {
                next()
            } else {
                res.status(403).send({
                    message: "err_log"
                })
            }
        })
    } catch (err) {
        res.status(403).send({
            message: err
        })
    }

}

checkAccess = async (req, res, next) => {

    try {
        const userId = req.userId
        await User.findOne({
            where: {
                id: userId
            }
        }).then(user => {
            if (user) {
                res.status(200).send({
                    status: true
                })
            } else {
                res.status(403).send({
                    status: false
                })
            }
        })
    } catch (err) {
        res.status(403).send({
            message: err
        })
    }

}

const authMiddleware = {
    enableLog, checkAccess
};

module.exports = authMiddleware;