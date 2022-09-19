const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        truck_make_model: { type: DataTypes.STRING(250), allowNull: false},
        truck_model_yr: { type: DataTypes.INTEGER(5), allowNull: false},
        miles_on_truck: { type: DataTypes.STRING(250), allowNull: false},
        shock_absorption_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        steering_wheel_comfort_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        sleeper_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        controls_friendliness_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        instrument_panel_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        infotainment_system_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        surrounding_visibility_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        sound_proofing_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        driving_features_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        door_functions_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        overall_experience_rating: { type: DataTypes.INTEGER(1), allowNull: false},
        create_date: { type: DataTypes.DATEONLY, allowNull: false},
        create_time: { type: DataTypes.TIME, allowNull: false},
        create_timezone: { type: DataTypes.STRING(20), allowNull: false},

        
        
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('truck_rating', attributes, options);
}