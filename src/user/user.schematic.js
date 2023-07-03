const Joi = require("joi");

const createSchematic = Joi.object(
    {
        name: Joi.string().required(),
        code: Joi.string(),
        historic: Joi.string()
    }
)

module.exports = {
    createSchematic
}
