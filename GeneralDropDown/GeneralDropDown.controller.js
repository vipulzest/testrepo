const GeneralDropDown = require('./GeneralDropDown.service');

module.exports = {
    getAll
}

function getAll(req, res, next) {
    GeneralDropDown.getAll()
        .then((items) => {
            if (items) {
                res.json({ status: 200, 'items': items }); // send 200 response if record found
            } else {
                res.json({ status: 404, 'message': 'No records found' });
            }
        })
        .catch(next);
}