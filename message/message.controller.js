
const Role = require('_helpers/role');
const messageService = require('./message.service');

// routes

module.exports = { getAll, getById, sendMessage }

function getAll(req, res, next) {
    messageService.getAll()
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

    messageService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function sendMessage(req, res, next) {
    messageService.create(req.body, req.get('origin'))
        .then(() => res.json({ status: 200, message: 'Message send successfully' }))
        .catch(next);
}
