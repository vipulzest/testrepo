
const Role = require('_helpers/role');
const driversEmployersWorkedAtService = require('./drivers_employers_workedAt.service');
const userService = require('../users/user.service');
const moment = require('moment');

module.exports = {
    getAll, getById, register_step3_for_driver
}

function getAll(req, res, next) {
    driversEmployersWorkedAtService.getAll()
        .then((items) => {
            if (items) {
                res.json({ status: 200, 'items': items }); // send 200 response if record found
            } else {
                res.json({ status: 404, 'message': 'No records found' });
            }
        })
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own user and admins can get any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    driversEmployersWorkedAtService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function register_step3_for_driver(req, res, next) {
    driversEmployersWorkedAtService.register(req.body, req.get('origin'))
        .then((response) => {
            return res.send(response);
            // // const userUpdatedData = {
            // //     reg_steps_completed: "3",
            // //     updated_at: moment().format('YYYY-MM-DD HH:MM:SS')
            // // }
            // // userService.update(userId, userUpdatedData);

            // res.json({ userId: userId, message: 'Registration successful' })
        })
        .catch(next);
}