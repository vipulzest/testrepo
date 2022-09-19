const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        destinations_id: { type: DataTypes.INTEGER(5), allowNull: false},
        date_of_last_visit: { type: DataTypes.DATEONLY, allowNull: false},
        type_of_rating: { type: DataTypes.ENUM('P', 'D','U'), defaultValue: 'U', allowNull: false },
        overall_experience_rating : { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        avg_wait_time_hr : { type: DataTypes.INTEGER(2), allowNull: false,defaultValue:0},
        tip_added :  { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        image_added :  { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        tip_text: { type: DataTypes.TEXT, allowNull: true,defaultValue: "No tip added" },
        uploaded_files_imageid: { type: DataTypes.INTEGER(5), allowNull: false, defaultValue:0},
        likes_counter: { type: DataTypes.INTEGER(5), allowNull: false,defaultValue:0},
        create_date: { type: DataTypes.DATEONLY, allowNull: false },
        create_time: { type: DataTypes.TIME, allowNull: false },
        create_timezone: { type: DataTypes.STRING(50), allowNull: false},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('destination_ratings', attributes, options);
}