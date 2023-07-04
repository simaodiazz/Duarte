const Joi = require("joi");

const createSchematic = Joi.object(
    {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        fringerprintCode: Joi.string(),
        acessHistory: Joi.string()
    }
)

module.exports = {
    createSchematic
}
