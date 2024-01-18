const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const ComponentType = sequelize.define('ComponentType', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, //Borrado Lógico
        }
    });

    return ComponentType;
};