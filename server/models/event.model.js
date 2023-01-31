module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE(6)
        },
        dateOn: {
            type: Sequelize.DATEONLY
        }
    });
    return Event;
};