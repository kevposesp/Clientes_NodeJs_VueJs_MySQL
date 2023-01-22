const { verifyToken } = require("../middleware/authJwt");
const { listClients } = require("../controllers/client.controller");

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
        [
            verifyToken
        ],
        listClients
    )


    // app.get(
    //     "/client/crete",
    //     [
    //         authJwt.verifyToken
    //     ],
    //     create
    // )

};