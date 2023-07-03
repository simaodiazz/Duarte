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

        code: {
            type: DataTypes.STRING,
            allowNull: true
        },

        historic: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: ""
        }
    },
    {
        sequelize: sequelize,
        modelName: "User",
        tableName: "users"
    }
)

User.beforeCreate((user) => {
    user.password = Bcrypt.hashSync(user.password, 10)
})  

module.exports = {
    User
}