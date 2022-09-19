const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
        name: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
        email: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
        issue: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('message', attributes, options);
}