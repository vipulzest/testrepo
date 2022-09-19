const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        name: { type: DataTypes.STRING(20), allowNull: false},
        email: { type: DataTypes.STRING(50), allowNull: false},
        type: { type: DataTypes.ENUM('admin'), defaultValue: 'admin'},
        reset_token: { type: DataTypes.STRING(255), allowNull: true,defaultValue:null},
        remember_token: { type: DataTypes.STRING(255), allowNull: true,defaultValue:null},
        profile_image: { type: DataTypes.STRING(255), allowNull: true,defaultValue:null},
        password: { type: DataTypes.STRING(255), allowNull: false},
        created_at: { type: DataTypes.DATE, allowNull: true,defaultValue:null},
        updated_at: { type: DataTypes.DATE, allowNull: true,defaultValue:null},
    };
    


    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('admin_user', attributes, options);
}