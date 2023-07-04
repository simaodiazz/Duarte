const { User } = require("./user");

const { createSchematic } = require("./user.schematic");

const { UserDTO } = require("./user.dto");

const JWT = require("jsonwebtoken");

const generateToken = (user) => {
    const payload = {
        id: user.id,
        isAdmin: user.isAdmin,
    };

    const options = {
        expiresIn: "24h",
    };

    return JWT.sign(payload, "U(=H8hU)=yeyh)Y82", options);
};

const isAdmin = (req) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = JWT.verify(token, "U(=H8hU)=yeyh)Y82");
        const { isAdmin } = decodedToken;
        return isAdmin;
    } catch (error) {
        return false;
    }
};

const findAll = async (req, res) => {
    const users = await User.findAll();
    res.json(users.map((user) => new UserDTO(user.name)));
};

const find = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
        res.status(404).json({
            error: "Esse utilizador não existe.",
        });
        return;
    }

    res.json(new UserDTO(user.name));
};

const create = async (req, res) => {
    const validator = createSchematic.validate(req.body);

    if (!validator) {
        res.status(400).json({
            error: "A estrutura de sua requesição é inválida.",
        });
        return;
    }

    const { name, email, password, fingerprintCode, accessHistory, isAdmin } = req.body;

    const user = { name, email, password, fingerprintCode, accessHistory, isAdmin };

    generateToken(user);

    User.create({
        name,
        email,
        password,
        fingerprintCode,
        accessHistory,
        isAdmin,
    });

    res.json(req.body);
};

const update = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
        res.status(404).json({
            error: "Esse utilizador não existe.",
        });
        return;
    }

    const { name, email, password, fingerprintCode, accessHistory, isAdmin } = req.body;

    // Atualizar os dados do usuário
    user.name = name;
    user.email = email;
    user.password = password;
    user.fingerprintCode = fingerprintCode;
    user.accessHistory = accessHistory;
    user.isAdmin = isAdmin;

    await user.save(); // Salvar as alterações no banco de dados

    res.json({ message: "Utilizador atualizado com sucesso." });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
        res.status(404).json({
            error: "Esse utilizador não existe.",
        });
        return;
    }

    await user.destroy(); // Remover o usuário do banco de dados

    res.json({ message: "Utilizador removido com sucesso." });
};

module.exports = {
    isAdmin,
    findAll,
    find,
    create,
    update,
    remove,
};
