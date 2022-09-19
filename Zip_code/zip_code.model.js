const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true },
        zip_code_id: { type: DataTypes.CHAR(20),allowNull:true},
        zip_code: { type: DataTypes.INTEGER(5), allowNull: false},
        insert_Date: { type: DataTypes.DATEONLY, allowNull: false },
        last_Update_Date: { type: DataTypes.DATEONLY, allowNull:false },
        notes_for_update: { type: DataTypes.STRING(50), allowNull:true, default:null }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'zipcode',
        indexes:[{
            unique: true,
            fields:['zip_Code']
        }]
    };

    return sequelize.define('zip_Code', attributes, options);
}