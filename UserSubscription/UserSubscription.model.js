const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.BIGINT(20)},
        plan_name: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
        price: { type: DataTypes.INTEGER(10) },
        term: { type: DataTypes.INTEGER(2) },
        purchase_date: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
        expiration_date: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
        total_term_amount: { type: DataTypes.DECIMAL(8,2) },
        payment_status: { type: DataTypes.ENUM('Success', 'Fail','Pending'), defaultValue: 'Pending' },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true
        }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('user_subscription', attributes, options);
}