// const { authJwt } = require("../middleware");
// const {  } = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // User
    // app.get(
    //     "/user/cret",
    //     [
    //         authJwt.verifyToken
    //     ],

    // )
    // /User

};