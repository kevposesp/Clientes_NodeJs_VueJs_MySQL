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

deleteClient = async (req, res) => {
    const { id } = req.body
    User.destroy({
        where: {
            id
        }
    })
        .then(user => {
            res.status(200).send({
                message: "delete_user_ok"
            });
        })
}

const authController = {
    listClients,
    deleteClient
}

module.exports = authController