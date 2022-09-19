const db = require('_helpers/db');
const Role = require('_helpers/role');
const userService = require('../users/user.service')
var moment = require('moment');
const { generateUniqueString, addOrgCodeEarnPoint } = require('_helpers/general_helper');
const notificationService = require('../Notificaions/Notification.service')
const { Op } = require("sequelize");


module.exports = {
    register,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const users = await db.driverEmpWorkedAt.findAll({
        order: [
            ['id', 'DESC'],
        ],
    });
    return users.map(x => basicDetails(x));
}

async function getById(id) {
    const user = await getuser(id);
    return basicDetails_user(user);
}

async function create(params) {

    const user = new db.driverEmpWorkedAt(params);
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
    if (params.email && user.email !== params.email && await db.PhoneAreaCode.findOne({ where: { email: params.email } })) {
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

async function register(params, origin) {
    const user = await getuser(params.user_id)

    const find_fo_in_all_fleet_owner_or_not = await check_fo_in_all_fleet_owner_or_not(params);

    if (find_fo_in_all_fleet_owner_or_not == false) {
        const find_fo_in_all_fleet_owner_or_not = await add_fo_in_all_fleet_owner(params, user);
    }

    if (params.employer_orgcode) {
        const foOrgProfile = await db.FoOrgProfile.findOne({ where: { employer_orgcode: params.employer_orgcode, org_status: 'A' } })
        if (foOrgProfile !== null && find_fo_in_all_fleet_owner_or_not !== null) {
            const driverEmpWorkedAt = await saveDriverEmpWorkedAt(params)
            // Add FO Organization Table 
            const fo_org_member = await add_fo_org_members(find_fo_in_all_fleet_owner_or_not, params, user);
            const foOrgProfileData = await updateFoOrgProfile(foOrgProfile)
            //reward pending
            const fleet_owner = await getuser(foOrgProfile.user_id)

            const earnPointDriver = await addOrgCodeEarnPoint(user)
            const earnPointFleetOwner = await addOrgCodeEarnPoint(fleet_owner)

            // update rewards_curr_total in user table
            await userService.update(earnPointDriver.user_id, { rewards_curr_total: earnPointDriver.current_total });
            await userService.update(earnPointFleetOwner.user_id, { rewards_curr_total: earnPointFleetOwner.current_total });

        } else {
            return { status: 412, message: "Org code not valid or organization not found." }
        }
    } else {
        if (find_fo_in_all_fleet_owner_or_not !== null) {
            const foOrgProfile = await db.FoOrgProfile.findOne({ where: { employer_name: find_fo_in_all_fleet_owner_or_not.employer_name } })
            const driverEmpWorkedAt = await saveDriverEmpWorkedAt(params)
            const foOrgProfileData = await updateFoOrgProfile(foOrgProfile)
            const fo_org_member = await add_fo_org_members(find_fo_in_all_fleet_owner_or_not, params, user);

            user.notification_code = "D02"
            user.scheduled_date = moment(user.create_date, "DD-MM-YYYY").add(30, 'days')
            user.scheduled_time = '11:30:00'
            user.scheduled_timezone = "EST"
            const notification = notificationService.createNotification(user)
        }
    }
    const visCommUserpref = {
        user_name: user.user_name,
        profile_Vis: 'Y',
        push_Notif: 'Y',
        match_Alerts: 'Y',
        org_Ratings_Vis: 'N',
        last_update_date: moment().format('YYYY-MM-DD'),
        user_id: user.id,
    };

    const Userpref = new db.vis_Comm_UserPref(visCommUserpref);
    await Userpref.save();

    const userUpdatedData = {
        reg_steps_completed: "3",
        last_update_date: Date.now(),
    }

    userService.update(user.id, userUpdatedData);
    // return params.user_id
    return { status: 200, user_name: user.user_name, user_id: user.id, message: 'Registration successful' };

}

async function saveDriverEmpWorkedAt(params) {
    const driver = await getById(params.user_id)
    const driverEmpWorkedAt = new db.driverEmpWorkedAt(params);
    driverEmpWorkedAt.user_name = driver.user_name;
    driverEmpWorkedAt.created_at = moment().format('YYYY-MM-DD');
    driverEmpWorkedAt.employer_orgcode = params.employer_orgcode
    driverEmpWorkedAt.insert_date = driver.create_date
    await driverEmpWorkedAt.save();

}

// async function addOrgCodeEarnPoint(params) {
//     return new db.userRewardPoint({
//         user_id: params.id,
//         reward_reason_code: 'RWR_03',
//         Reward_Points: 10,
//         reward_action_date: user.create_date,
//         award_date: moment().format('YYYY-MM-DD HH:MM:SS'),
//         ...params
//     })
// }

async function updateFoOrgProfile(foOrgProfile) {
    var d = new Date()
    var newDate = d.setMonth(d.getMonth() - 6)
    const FoOrgMemberTotal = await db.FoOrgMember.count({
        where: {
            employer_orgcode: foOrgProfile.employer_orgcode,
            create_date: {
                [Op.lt]: Date.now(),
                [Op.gt]: newDate
            }
        }
    })
    const totalEmpCount = await db.FoOrgMember.count({
        where: {
            employer_orgcode: foOrgProfile.employer_orgcode
        }
    })
    foOrgProfile.num_drivers = totalEmpCount
    foOrgProfile.drivers_joined_last6mo = FoOrgMemberTotal
    foOrgProfile.last_update_date = moment().format('YYYY-MM-DD');
    foOrgProfile.save()
}

async function add_fo_org_members(fo, params, user) {
    const fo_org_member = new db.FoOrgMember(params);
    fo_org_member.employer_id = fo.id;
    fo_org_member.employer_orgcode = fo.employer_orgcode;
    fo_org_member.employer_name = params.employer_name;
    fo_org_member.user_id = params.user_id;
    fo_org_member.user_name = user.user_name
    fo_org_member.create_date = user.create_date
    fo_org_member.employer_zipcode = params.employer_Zipcode;
    fo_org_member.create_time = user.create_time
    fo_org_member.create_timezone = user.create_timezone
    fo_org_member.last_update_date = user.last_update_date
    await fo_org_member.save();
}
async function add_fo_in_all_fleet_owner(params, user) {
    const employer_orgcode = await generateUniqueString(5, 'MI-', 'all_fleet_companies', 'employer_orgcode', true);
    const all_fleet_owner_company = new db.AllFeetCompany(params);
    all_fleet_owner_company.employer_name = params.employer_name;
    all_fleet_owner_company.employer_orgcode = employer_orgcode;
    all_fleet_owner_company.employer_zipcode = params.employer_zipcode;
    all_fleet_owner_company.employer_usdot = ""
    all_fleet_owner_company.insert_date = user.create_date
    all_fleet_owner_company.last_update_date = user.last_update_date
    await all_fleet_owner_company.save();
    return all_fleet_owner_company;



}

async function check_fo_in_all_fleet_owner_or_not(params) {
    let check_flag = await db.AllFeetCompany.findOne({ where: { employer_name: params.employer_name, employer_streetaddress: params.employer_streetaddress, employer_city: params.employer_city } });
    if (!check_flag) {
        return false;
    } else {
        return check_flag;
    }
}

async function getuser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'user not found';
    return user;
}

function basicDetails(user) {
    const { id, user_name, employer_Name, current_Employer, employer_Zipcode, employer_Orgcode, date_Joined, date_Left } = user;
    return { id, user_name, employer_Name, current_Employer, employer_Zipcode, employer_Orgcode, date_Joined, date_Left };
}

function basicDetails_user(user) {
    const { id, title_gender, user_name, first_name, last_name, user_role, isVerified, create_date, create_time, create_timezone, last_update_date } = user;
    return { id, title_gender, user_name, first_name, last_name, user_role, isVerified, create_date, create_time, create_timezone, last_update_date };
}