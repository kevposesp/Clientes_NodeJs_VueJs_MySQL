const { verifyToken } = require("../middleware/authJwt");
const { clientExists, eventExists } = require("../middleware/createOrder");
const { readOrders, createOrder, updateOrder, cancelOrder } = require("../controllers/order.controller");

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
    
    app.post(
        "/orders/create",
        [
            verifyToken,
            clientExists,
            eventExists
        ],
        createOrder
    )
    
    app.post(
        "/order/edit",
        [
            verifyToken
        ],
        updateOrder
    )
    
    app.post(
        "/order/cancel",
        [
            verifyToken
        ],
        cancelOrder
    )

};