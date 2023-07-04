const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Bcrypt = require('bcrypt')

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false  
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        fingerprintCode: {
            type: DataTypes.STRING,
            allowNull: true
        },

        accessHistory: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: ""
        },

        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize: sequelize,
        modelName: "User",
        tableName: "users"
    }
)

User.beforeCreate((user) => {
    const salt = Bcrypt.genSaltSync(10)
    const hash = Bcrypt.hashSync(user.password, salt)
    user.password = hash
})

module.exports = {
    User
}