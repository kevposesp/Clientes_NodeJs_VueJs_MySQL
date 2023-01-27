const db = require("../models");
const Event = db.event;

createEvent = (req, res) => {
    const { nombre, descripcion, date } = req.body
    Event.findOne({
        where: {
            date
        }
    }).then((ev) => {
        if (ev) {
            res.status(500).send({
                message: 'ex_event'
            })
        } else {
            Event.create({
                nombre,
                descripcion,
                date
            }).then((event) => {
                if (event) {
                    res.status(200).send({
                        message: 'create_ok'
                    })
                } else {
                    res.status(500).send({
                        message: 'err_create_event'
                    })
                }
            })
        }
    })

}

const eventController = {
    createEvent
}

module.exports = eventController