const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(10), autoIncrement: true, primaryKey: true },
        fo_drv_results_id: { type: DataTypes.INTEGER(10), allowNull: false},
        Sent_Invite:{ type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Sent_Invites_ID: { type: DataTypes.INTEGER(5), allowNull: false},
        Saved_Status:{ type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Create_Date: { type: DataTypes.DATEONLY, allowNull: false},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'driver_job_matches',
    };

    return sequelize.define('driverJobMatches', attributes, options);
}