const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        cdl_experience_bin: { type: DataTypes.STRING(20), allowNull: false},       
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'cdl_years_exper',
        
    };

    return sequelize.define('cdl_years_exper', attributes, options);
}