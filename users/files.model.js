const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        file_name: { type: DataTypes.STRING(50), allowNull: false },
        upload_date: { type: DataTypes.DATEONLY, allowNull: false },
        slug: { type: DataTypes.STRING(255), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,

    };

    return sequelize.define('user_uploaded_file', attributes, options);
}