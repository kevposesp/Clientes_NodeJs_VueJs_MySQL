const db = require("../models");
const User = db.user;

listClients = (req, res) => {
    User.findAll({
    })
        .then(clients => {
            res.status(200).send({
                message: "list_ok",
                data: clients
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const authController = {
    listClients
}

module.exports = authController