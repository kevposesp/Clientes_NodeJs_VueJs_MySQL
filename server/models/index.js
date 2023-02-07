const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);

// RefreshToken
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// Order
db.user.hasMany(db.order, {
    foreignKey: 'userId', targetKey: 'id'
})
db.order.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
})

db.user.hasMany(db.order, {
    foreignKey: 'ownerId', targetKey: 'id'
})
db.order.belongsTo(db.user, {
    foreignKey: 'ownerId', targetKey: 'id'
})
db.event.hasMany(db.order, {
    foreignKey: 'eventId'
})
db.order.belongsTo(db.event,{
    foreignKey: 'eventId'
})

module.exports = db;