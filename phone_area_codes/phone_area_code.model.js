const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        area_code: { type: DataTypes.INTEGER(3), allowNull: false },
        insert_date: { type: DataTypes.DATEONLY, allowNull: false },
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false },
        notes_for_update: { type: DataTypes.STRING(50), allowNull: true },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        indexes:[{
            unique: true,
            fields:['area_code']
        }]
    };

    return sequelize.define('phone_area_code', attributes, options);
}