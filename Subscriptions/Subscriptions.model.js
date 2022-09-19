const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(3), autoIncrement: true, primaryKey: true },
        Subscription_package: { type: DataTypes.STRING(15), allowNull: false },
        Subscription_description: { type: DataTypes.STRING(500), allowNull: false },
        Subscription_Type: { type: DataTypes.STRING(15), allowNull: false },
        Validity_begin_date: { type: DataTypes.DATEONLY, allowNull: false },
        Validity_end_date: { type: DataTypes.DATEONLY, allowNull: false },
        Term_length: { type: DataTypes.INTEGER(2), allowNull: false },
        Amount_per_term: { type: DataTypes.DECIMAL(8, 2), allowNull: false },

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('subscriptions', attributes, options);
}