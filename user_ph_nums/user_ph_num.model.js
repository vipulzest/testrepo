const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        users_ph_num_part1: { type: DataTypes.STRING(5), allowNull: false ,defaultValue:'+1'},
        users_ph_num_part2: { type: DataTypes.INTEGER(3), allowNull: false },
        users_ph_num_part3: { type: DataTypes.INTEGER(7), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'users_ph_num',
    };

    return sequelize.define('users_ph_num', attributes, options);
}