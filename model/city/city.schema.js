const { DataTypes } = require('sequelize');
const { dbConn } = require('../../libraries/database/mysql/connection');

const City = dbConn.sequelize.define('cities', {
    city_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
    },
}, {
    timestamps: false,
});


module.exports = {
    City,
};