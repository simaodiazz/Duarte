const { User } = require("./user")
const { createSchematic, updateSchematic } = require("./user.schematic")

const findAll = async(request, response) => {

    const users = await User.findAll()

    response.json(users.map(user => new UserDTO(user.name)))

}

const find = async(request, response) => {

    const { id } = request.params

    const user = await User.findByPk(id)

    if (user === undefined) {
        response.status(404).json(
            {
                error: "Esse utilizador não existe."
            }
        )
        return;
    }

    response.json(new UserDTO(user.name))
}

const create = async(request, response) => {

    const validator = createSchematic.validate(request.body)

    if (!validator) {
        response.error(400).json(
            {
                error: "A estrutura de sua requesição é inválida."
            }
        )
        return;
    }

    const { name } = request.body

    response.json(request.body)
}

const update = async(request, response) => {

    const { id } = request.params

    const user = await User.findByPk(id)

    if (user === undefined) {
        response.status(404).json(
            {
                error: "Esse utilizador não existe."
            }
        )
        return;
    }

    const { name, code, historic } = request.body

    if (name != undefined) user.name = name
    if (code != undefined) user.code = code
    if (historic != undefined) user.undefined = undefined

    User.update(user)
}

module.exports = {
    findAll,
    find,
    create,
    update
}