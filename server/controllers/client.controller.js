const db = require("../models");
const User = db.user;

listClients = (req, res) => {
    User.findAll({
        where: {
            status: 1
        },
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
    const client = await User.findOne({
        where: {
            id
        }
    })
    if(client){
        await client.update({
            status: 0
        })
        await client.save()
        res.status(200).send({
            message: "delete_user_ok"
        })
    } else {
        res.status(403).send({
            message: "client_not_found"
        })
    }
}

createClient = async (req, res) => {
    const { nombreClient, dirClient, telfClient } = req.body
    
    let telfClient2 = null
    if (req.body.telfClient2 != "") {
        telfClient2 = req.body.telfClient2
    }
    
    let notaClient = null
    if (req.body.notaClient != "") {
        notaClient = req.body.notaClient
    }

    await User.create({
        nombre: nombreClient,
        direccion: dirClient,
        notas: notaClient,
        tel: telfClient,
        telSec: telfClient2,
        username: null,
        password: null,
        enableLog: false,
        status: 1
    }).then((client) => {
        if (client) {
            res.status(200).send({
                message: 'create_ok'
            })
        } else {
            res.status(500).send({
                message: 'err_create_client'
            })
        }
    })
}

const authController = {
    listClients,
    listClient,
    updateClient,
    deleteClient,
    createClient
}

module.exports = authController