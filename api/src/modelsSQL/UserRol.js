const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    const UserRol = sequelize.define('UserRol', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    });
    return UserRol;
};