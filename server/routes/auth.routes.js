const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authJwt");
const { enableLog } = require("../middleware/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/auth/signin",
        [
            enableLog
        ],
        controller.signin
    );

    // app.post(
    //     "/auth/info",
    //     [
    //         verifyToken
    //     ],
    //     controller.infoUser
    // );

    // app.post("/auth/refreshtoken", controller.refreshToken)
};