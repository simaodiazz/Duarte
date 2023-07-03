const Express = require('express')
const { sequelize } = require('./database')
const { userRoute } = require('./user/user.route')

const express = Express()

sequelize
    .sync()
    .then(() => {
        express.listen(3000, () => {
            console.log('Servidor ligado.')
        })
    })
    .catch((error) => {
        console.log(error)
    }
)

express.use(Express.json())

express.use('/api/v1/', userRoute)
