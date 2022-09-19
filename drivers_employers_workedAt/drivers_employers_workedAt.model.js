const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false },
        employer_name: { type: DataTypes.STRING(250), allowNull: false },
        current_employer: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'Y',allowNull: false  },
        employer_zipcode: { type: DataTypes.INTEGER(5), allowNull: false },
        employer_orgcode: { type: DataTypes.STRING(250), allowNull: true },
        date_joined: { type: DataTypes.DATEONLY, allowNull: false },
        date_left: { type: DataTypes.DATEONLY, allowNull: true },
        insert_date: { type: DataTypes.DATEONLY, allowNull: false },
        last_update_date: { type: DataTypes.DATEONLY },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        indexes:[{
              unique: false,
              fields:['employer_name','employer_orgcode']
        }]
    };

    return sequelize.define('driver_employer', attributes, options);
}