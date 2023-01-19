const { Op } = require("sequelize");
// const { sequelize } = require("../models");
const db = require("../models");

const User = db.user

enableLog = async (req, res, next) => {

    try {
        const { user } = req.body
        console.log(user);
        await User.findAll({
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
        console.log(err);
        res.status(403).send({
            message: err
        })
    }

}

const authMiddleware = {
    enableLog
};

module.exports = authMiddleware;