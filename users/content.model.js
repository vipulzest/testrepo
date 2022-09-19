const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING(255), allowNull: false},
        slug: { type: DataTypes.STRING(255), allowNull: false},
        doc_description: { type: DataTypes.TEXT, allowNull: false },
        version: { type: DataTypes.STRING(20), allowNull: false },
        add_date: { type: DataTypes.DATEONLY, allowNull: false },
        valid_from: { type: DataTypes.DATEONLY, allowNull: false },
        valid_to: { type: DataTypes.DATEONLY },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'legal_content',
        
    };

    return sequelize.define('legal_content', attributes, options);
}