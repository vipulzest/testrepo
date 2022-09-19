const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        user_email: { type: DataTypes.STRING(50), allowNull: true, defaultValue:null },
        submitted_form_type:{ type: DataTypes.ENUM('C', 'F','H'),allowNull: false},
        form_submission_date: { type: DataTypes.DATEONLY, allowNull: false},
        form_submission_time: { type: DataTypes.TIME, allowNull: false },
        form_submission_timezone: { type: DataTypes.STRING(50), allowNull: false},
        form_submission_message: { type: DataTypes.STRING(150), allowNull: false, defaultValue:'Type here'},
        response_sent: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        response_date: { type: DataTypes.DATEONLY, allowNull: true, defaultValue:null},
        issue_status: { type: DataTypes.ENUM('Open', 'Closed','In Process','Review End of Quarter'), defaultValue: 'Open' ,allowNull: false},
        deleted_from_admin_view: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        //response_message: { type: DataTypes.TEXT, allowNull: false},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'user_form_sub',
    };

    return sequelize.define('user_form_sub', attributes, options);
}