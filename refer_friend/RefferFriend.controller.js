const RefferFriendService = require('./RefferFriend.service');

module.exports = {
    sendReferFriend
}
async function sendReferFriend(req, res, next) {

    RefferFriendService.sendReferal(req.body, req.user)
        .then((response) => {

            res.status(response.status).json(response)
        })
        .catch(next);
}
