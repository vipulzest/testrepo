const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const drivers = await db.DriverProfile.findAll({
        order: [
            ['id', 'DESC'],
        ],
    });
    return drivers.map(x => basicDetails(x));
}

async function getById(id) {
    const driver = await getdriver(id);
    return basicDetails(driver);
}

async function create(params) {
    // validate
    if (await db.DriverProfile.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const driver = new db.DriverProfile(params);


    // save driver
    await driver.save();

    return basicDetails(driver);
}

async function update(id, params) {
    const driver = await getdriver(id);


    // copy params to driver and save
    Object.assign(driver, params);
    driver.updated = Date.now();
    await driver.save();

    return basicDetails(driver);
}

async function _delete(id) {
    const driver = await getdriver(id);
    await driver.destroy();
}


function basicDetails(driver) {
    const { id, driverName, zipCode, us_work_6mth_auth, auth_work_until, trailer_type_2yrs, cdl_type, cdl_experience, cdl_state, cdl_exp_date, cdl_doc_uploaded, cdl_doc_id, validated_cdl, referral_code, currently_employed, terms_conditions_viewed, create_date, create_time, create_timezone } = driver;
    return { id, driverName, zipCode, us_work_6mth_auth, auth_work_until, trailer_type_2yrs, cdl_type, cdl_experience, cdl_state, cdl_exp_date, cdl_doc_uploaded, cdl_doc_id, validated_cdl, referral_code, currently_employed, terms_conditions_viewed, create_date, create_time, create_timezone };
}