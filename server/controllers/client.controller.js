const db = require("../models");
const User = db.user;

listClients = (req, res) => {
    User.findAll({
        attributes: ['id', 'nombre', 'direccion', 'notas', 'tel', 'telSec']
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

listClient = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        },
        attributes: ['id', 'nombre', 'direccion', 'notas', 'tel', 'telSec']
    })
        .then(client => {
            if (client) {
                res.status(200).send({
                    message: "list_ok",
                    data: client
                });
            } else {
                res.status(403).send({
                    message: "err_not_found"
                });
            }

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

updateClient = async (req, res) => {
    console.log(req.body);
    const client = await User.findOne({
        where: {
            id: req.body.id
        },
        attributes: ['id', 'nombre', 'direccion', 'notas', 'tel', 'telSec']
    })
    if(client){
        await client.update({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            notas: req.body.notas,
            tel: req.body.tel,
            telSec: req.body.telSec,
        })
        await client.save()
        res.status(200).send({
            message: 'update_ok',
            client
        })
    } else {
        res.status(403).send({
            message: 'client_not_found'
        })
    }
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
    listClient,
    updateClient,
    deleteClient
}

module.exports = authController