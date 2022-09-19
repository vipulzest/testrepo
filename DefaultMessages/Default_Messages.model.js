const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        def_Message_ID: { type: DataTypes.STRING(20), allowNull: false },
        message_Type: { type: DataTypes.TEXT, allowNull: false },
        default_text: { type: DataTypes.TEXT, allowNull: false },
        user_role: { type: DataTypes.TEXT, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('default_Messages', attributes, options);
}