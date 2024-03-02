const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    const ComponentClass = sequelize.define('ComponentClass', {
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
    return ComponentClass;
};