const db = require("../models");
const Event = db.event;

createEvent = (req, res) => {
    const { nombre, descripcion, date, dateOn } = req.body
    Event.findOne({
        where: {
            dateOn
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
                date,
                dateOn
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

readEvents = (req, res) => {
    Event.findAll({
        attributes: ['id', 'descripcion', 'date']
    })
    .then((evs) => {
        if(evs) {
            res.status(200).send({
                message: 'list_ok',
                data: evs
            })
        } else {
            res.status(500).send({
                message: 'err_list_events'
            })
        }
    })
}

const eventController = {
    createEvent,
    readEvents
}

module.exports = eventController