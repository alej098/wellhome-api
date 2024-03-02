const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Component = sequelize.define('Component',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        acceptCost: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, //Borrado Lógico
        },
    });

    return Component;
};