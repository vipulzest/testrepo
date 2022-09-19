const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        Subscription_Type: { type: DataTypes.STRING(15), allowNull: false, defaultValue: 'Trial' },
        Subscription_package: { type: DataTypes.STRING(15), allowNull: false, defaultValue: 'Basic' },
        Start_date: { type: DataTypes.DATEONLY, allowNull: false },
        End_date: { type: DataTypes.DATEONLY, allowNull: false },
        Term_length: { type: DataTypes.INTEGER(2), allowNull: false, defaultValue: 6 },
        Amount_due_term: { type: DataTypes.DECIMAL(8, 2), allowNull: false, defaultValue: 0 },
        Amount_paid: { type: DataTypes.DECIMAL(8, 2), allowNull: false, defaultValue: 0 },
        Reward_points_applied: { type: DataTypes.INTEGER(5), allowNull: false, defaultValue: 0 },
        Create_date: { type: DataTypes.DATEONLY, allowNull: false },
        Create_time: { type: DataTypes.TIME, allowNull: false },
        Create_timezone: { type: DataTypes.STRING(3), allowNull: false },
        Last_update_date: { type: DataTypes.DATEONLY, allowNull: false }

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('Subscription_History', attributes, options);
}