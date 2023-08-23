const { verifyToken } = require("../middleware/authJwt");
const { listClients, listClient, updateClient, deleteClient, createClient } = require("../controllers/client.controller");
const { checkAccess } = require("../middleware/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/clients/list",
        listClients
    )
    
    app.post(
        "/client/list",
        listClient
    )

    app.post(
        "/client/edit/save",
        [
            verifyToken
        ],
        updateClient
    )

    app.post(
        "/clients/delete",
        [
            verifyToken
        ],
        deleteClient
    )


    app.post(
        "/client/create",
        [
            verifyToken
        ],
        createClient
    )

};