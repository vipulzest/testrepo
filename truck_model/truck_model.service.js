const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const users = await db.TruckModel.findAll({
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
    if (await db.TruckModel.findOne({ where: { email: params.email } })) {
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
    if (params.email && user.email !== params.email && await db.TruckModel.findOne({ where: { email: params.email } })) {
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
    const { id, make, model_year } = user;
    return { id, make, model_year };
}