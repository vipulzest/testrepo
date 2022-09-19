const Role = require('_helpers/role');
const phoneAreaCodeService = require('./phone_area_code.service');

module.exports = { getAll, getById }

function getAll(req, res, next) {
    phoneAreaCodeService.getAll()
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

    phoneAreaCodeService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}