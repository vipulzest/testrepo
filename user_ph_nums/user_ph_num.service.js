const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const users = await db.UserPhNum.findAll({
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
    // validate
    if (await db.UserPhNum.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    user.verified = Date.now();

    // hash password
    user.passwordHash = await hash(params.password);

    // save user
    await user.save();

    return basicDetails(user);
}

async function update(id, params) {
    const user = await getuser(id);

    // validate (if email was changed)
    if (params.email && user.email !== params.email && await db.UserPhNum.findOne({ where: { email: params.email } })) {
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


function basicDetails(user) {
    const { id, user_name, Users_ph_num_part1, Users_ph_num_part2, Users_ph_num_part3 } = user;
    return { id, user_name, Users_ph_num_part1, Users_ph_num_part2, Users_ph_num_part3 };
}