// const { authJwt } = require("../middleware");
// const {} = require("../controllers/client.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // app.get(
    //     "/client/crete",
    //     [
    //         authJwt.verifyToken
    //     ],
    //     create
    // )

};