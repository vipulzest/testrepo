const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        profile_Vis: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        push_Notif: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        match_Alerts: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        org_Ratings_Vis: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName:'vis_Comm_UserPref'
    };

    return sequelize.define('vis_Comm_UserPref', attributes, options);
}