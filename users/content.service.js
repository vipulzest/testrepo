const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    get_terms_condition,
    get_content
};



async function get_terms_condition(id) {
    const content = await getContent(id);
    return get_content(content);
}
async function getContent(id) {
    const content = await db.Content.findByPk(id);
    if (!content) throw 'content not found';
    return content;
}

function get_content(contents) {
    const { id, title, slug, content } = contents;
    return { id, title, slug, content };
}