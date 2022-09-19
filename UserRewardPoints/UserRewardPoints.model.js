const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        reward_reason_code: { type: DataTypes.STRING(50), allowNull: false},
        reward_points: { type: DataTypes.INTEGER(10), allowNull:false},
        reward_action_date: { type: DataTypes.DATEONLY, allowNull: false},
        award_date: { type: DataTypes.DATEONLY, allowNull: false},
        current_total: { type: DataTypes.INTEGER(100), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('user_reward_point', attributes, options);
}