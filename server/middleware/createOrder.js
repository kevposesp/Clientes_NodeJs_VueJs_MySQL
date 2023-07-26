const { Op } = require("sequelize");
// const { sequelize } = require("../models");
const db = require("../models");

const User = db.user
const Event = db.event

clientExists = async (req, res, next) => {

    try {
        const { idClient } = req.body
        await User.findOne({
            where: {
                id: idClient
            }
        }).then(user => {
            if (user) {
                next()
            } else {
                res.status(403).send({
                    message: "err_user_ex"
                })
            }
        })
    } catch (err) {
        res.status(403).send({
            message: err
        })
    }

}

eventExists = async (req, res, next) => {

    try {
        const { fecOrder } = req.body
        await Event.findOne({
            where: {
                id: fecOrder
            }
        }).then(event => {
            if (event) {
                next()
            } else {
                res.status(403).send({
                    message: "err_event_ex"
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
    clientExists, eventExists
};

module.exports = authMiddleware;