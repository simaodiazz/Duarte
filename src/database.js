const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'express',
    'simaodiazz',
    'simaopks009',
    {
        dialect: "mysql",
        host: "localhost"
    }
)

module.exports = {
    sequelize
}
