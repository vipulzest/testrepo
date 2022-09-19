const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        reward_reason_code: { type: DataTypes.STRING(50), allowNull: false },
        reward_reason: { type: DataTypes.STRING(100), allowNull: false},
        related_epic_name: { type: DataTypes.STRING(255), allowNull: false},
        user_role: { type: DataTypes.STRING(50), allowNull: false},
        reward_points: { type: DataTypes.INTEGER(10),allowNull: false},
        condition_award: { type: DataTypes.TEXT, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'reward_points_list',
    };

    return sequelize.define('reward_points_list', attributes, options);
}