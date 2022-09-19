const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    getAll,
};

async function getAll() {

    //var attributes = ['cld_code_id', 'cdl_type'];
    const cdlTypeDropDown = await db.CdlType.findAll({
        // attributes:attributes,
        order: [
            ['id', 'DESC'],
        ],
    });

    //var cdlYearExpattribute = ['cdl_exp_bin_id', 'cdl_experience_bin_lower','cdl_experience_bin_upper'];
    const CdlYearExp = await db.CdlYearExp.findAll({
        // attributes:cdlYearExpattribute,
        order: [
            ['id', 'DESC'],
        ],
    });

    //trailer type
    //var cdlYearExpattribute = ['trailer_code_id', 'trailer_type'];
    const TrailerType = await db.TrailerType.findAll({
        // attributes:cdlYearExpattribute,
        order: [
            ['id', 'DESC'],
        ],
    });

    //number of truck
    //var numTruckAttribute = ['num_trucks_bin_id', 'num_trucks_bin_lower','num_trucks_bin_upper'];
    const NumTrucks = await db.NumTrucks.findAll({
        //attributes:numTruckAttribute,
        order: [
            ['id', 'DESC'],
        ],
    });

    //role dropdown
    //var userRoleAttribute = ['role_id', 'user_role'];
    const UserRoles = await db.UserRoles.findAll({
        //attributes:userRoleAttribute,
        order: [
            ['id', 'DESC'],
        ],
    });

    //var cdlStateAttribute = ['cdl_state_id', 'cdl_state'];
    const CdlStates = await db.CdlStates.findAll({
        //  attributes:cdlStateAttribute,
        order: [
            ['id', 'DESC'],
        ],
    });



    const generalArr = {
        'cdl_type': cdlTypeDropDown,
        'cdl_year_exp': CdlYearExp,
        'trailer_type': TrailerType,
        'num_trucks': NumTrucks,
        'user_roles': UserRoles,
        'cdl_states': CdlStates,
    };

    return generalArr;
}




