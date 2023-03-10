const { verifyToken } = require("../middleware/authJwt");
const { readOrders } = require("../controllers/order.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get(
        "/orders/list",
        [
            verifyToken
        ],
        readOrders
    )

};