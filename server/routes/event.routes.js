const { verifyToken } = require("../middleware/authJwt");
const { createEvent } = require("../controllers/event.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/event/create",
        [
            verifyToken
        ],
        createEvent
    )

};