'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {

        }
    }
    Task.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.ENUM('pending', 'completed')
    }, {
        sequelize,
        tableName: 'Tasks',
        timestamps: false
    });
    return Task;
};