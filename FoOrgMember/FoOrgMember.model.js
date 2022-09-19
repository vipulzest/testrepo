const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        //user_id: { type: DataTypes.BIGINT(20)},
        employer_orgcode: { type: DataTypes.STRING(255), allowNull: false},
        employer_name: { type: DataTypes.STRING(100), allowNull: false},
        user_name: { type: DataTypes.STRING(20), allowNull: false },
        past_or_current_member: { type: DataTypes.ENUM('P', 'C'), defaultValue: 'C', allowNull: false },
        create_date: { type: DataTypes.DATEONLY, allowNull: false },
        create_time: { type: DataTypes.TIME, allowNull: false },
        create_timezone: { type: DataTypes.STRING(50), allowNull: false},
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('fo_org_members', attributes, options);
}