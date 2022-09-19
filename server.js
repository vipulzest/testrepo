require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
const redis = require('redis');
const config = require('config.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes

app.use('/general', require('./GeneralDropDown/GeneralDropDown.route'));
app.use('/users', require('./users/users.route'));
app.use('/fo', require('./fleet_owner/foOrgProfile.route'));
app.use('/phone_area_codes', require('./phone_area_codes/phone_area_code.route'));
app.use('/cdl_type', require('./cdl_type/cdl_type.route'));
app.use('/truck_model', require('./truck_model/truck_model.route'));
app.use('/trailer_type', require('./trailer_type/trailer_type.controller'));
app.use('/message', require('./message/message.route'));
app.use('/otp_codes', require('./otp_codes/otp_code.route'));
app.use('/drivers_employers_workedAt', require('./drivers_employers_workedAt/drivers_employers._workedAt.route'));
app.use('/refer', require('./refer_friend/RefferFriend.route'));
// app.use('/general', require('./GeneralDropDown/GeneralDropDown.controller'));


// swagger docs route
//app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);
//comment from vipul
// const client = redis.createClient();
// client.on('connect', function () {
//     console.log('Connected!');
// });
// client.on('error', err => {
//     console.log('Error ' + err);
// });


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

