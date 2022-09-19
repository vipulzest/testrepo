const express = require('express');
const router = express.Router();
const general_dropdownController = require("./GeneralDropDown.controller")

router.get('/general_dropdown', general_dropdownController.getAll);

module.exports = router;