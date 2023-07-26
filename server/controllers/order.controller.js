const db = require("../models");
const Order = db.order;
const Event = db.event;
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

readOrders = async (req, res) => {
    const query = "select o.id orderId, o.horaPedido, o.horaEntrega, o.nota, o.cant, o.status,"
        + " e.id eventId, e.`dateOn`, e.nombre nombreEvent,"
        + " u.id clientId, u.nombre nombreClient, u.direccion, u.notas notasCliente, u.tel, u.telSec,"
        + " ad.id ownerId, ad.nombre nombreOwner"
        + " from `events` e"
        + " left join `orders` o on o.`eventId` = e.id"
        + " left join users u on o.`userId` = u.id"
        + " left join users ad on ad.id = o.`ownerId`"
        + " order by e.dateOn, o.horaPedido;"

    const orders = await sequelize.query(query, {
        type: QueryTypes.SELECT
    })
    let data = {}
    orders.forEach(order => {
        if(Array.isArray(data[order.dateOn])){
            data[order.dateOn].push(order)
        } else {
            data[order.dateOn] = []
            data[order.dateOn].push(order)
        }
    });
    if (orders) {
        res.status(200).send({
            message: 'list_ok',
            data
        })
    } else {
        res.status(500).send({
            message: 'err_list_order'
        })
    }
}

createOrder = async (req, res) => {
    const { idClient, fecOrder, cantOrder, hourOrder } = req.body

    await Order.create({
        horaPedido: hourOrder,
        nota: "",
        cant: cantOrder,
        status: 0,
        userId: idClient,
        ownerId: req.userId,
        eventId: fecOrder
    }).then((order) => {
        if (order) {
            res.status(200).send({
                message: 'create_ok'
            })
        } else {
            res.status(500).send({
                message: 'err_create_order'
            })
        }
    })
}

const OrderController = {
    readOrders,
    createOrder
}

module.exports = OrderController