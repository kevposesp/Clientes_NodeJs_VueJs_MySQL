const db = require("../models");
const Event = db.event;
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

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
        attributes: ['id', 'descripcion', 'date', 'dateOn']
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

readEventsActive = async (req, res) => {
    const query = "select * from events where dateOn >= current_date()"

    const events = await sequelize.query(query, {
        type: QueryTypes.SELECT
    })
    if (events) {
        res.status(200).send({
            message: 'list_ok',
            data: events
        })
    } else {
        res.status(500).send({
            message: 'err_list_events'
        })
    }
}

const eventController = {
    createEvent,
    readEvents,
    readEventsActive
}

module.exports = eventController