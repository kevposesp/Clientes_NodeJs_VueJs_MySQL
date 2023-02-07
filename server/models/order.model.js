module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        horaPedido: {
            type: Sequelize.TIME
        },
        horaEntrega: {
            type: Sequelize.TIME
        },
        nota: {
            type: Sequelize.STRING
        },
        cant: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        }
    });
    return Order;
};