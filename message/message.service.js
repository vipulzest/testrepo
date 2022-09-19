const db = require('_helpers/db');
const Role = require('_helpers/role');
const userService = require('../users/user.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const users = await db.Message.findAll({
        order: [
            ['id', 'DESC'],
        ],
    });
    return users.map(x => basicDetails(x));
}

async function getById(id) {
    const user = await getuser(id);
    return basicDetails(user);
}

async function create(params) {
    const user = await userService.getUserIdByUsername(params)
    const message = new db.UserFormSub(params);
    message.user_id = user.id
    // console.log(message);
    await message.save();

    return true;
}

async function update(id, params) {
    const user = await getuser(id);

    // validate (if email was changed)
    if (params.email && user.email !== params.email && await db.Message.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await hash(params.password);
    }

    // copy params to user and save
    Object.assign(user, params);
    user.updated = Date.now();
    await user.save();

    return basicDetails(user);
}

async function _delete(id) {
    const user = await getuser(id);
    await user.destroy();
}


function basicDetails(message) {
    const { id, type, name, email, issue, created_at } = message;
    return { id, type, name, email, issue, created_at };
}