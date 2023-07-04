const Route = require('express')
const { findAll, find, create, update, remove } = require('./user.controller')

const userRoute = Route()
~
userRoute.get('/user', findAll)
userRoute.get('/user/:id', find)
userRoute.post('/user', create)
userRoute.put('/user/:id', update)
userRoute.delete('/user/:id', remove)

module.exports = {
    userRoute
}