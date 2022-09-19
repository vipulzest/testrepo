const db = require('_helpers/db');
var moment = require('moment');

module.exports = {
    createNotification
}

async function createNotification(user) {
    let notificationPrams = {
        user_id: user.id,
        user_name: user.user_name,
        notification_code: user.notification_code,
        scheduled_date: user.scheduled_date,
        scheduled_time: user.scheduled_time,
        scheduled_timezone: user.scheduled_timezone,
        create_date: user.create_date,
        create_time: user.create_time,
        create_timezone: user.create_timezone,
        sent_date: user.create_date,
        sent_time: user.create_time,
        sent_timezone: user.create_timezone,
        update_date: user.create_date
    }
    const notification = new db.Notifications(notificationPrams)
    await notification.save()
}