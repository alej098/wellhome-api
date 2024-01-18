const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        dni: {
            type: DataTypes.STRING,
            primaryKey: true, // Hace que el campo dni sea la clave primaria
            allowNull: false,
            unique: true,
        },
        foreName: {
            type: DataTypes.STRING,
            validate: {
              len: [2, 20]
            },
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
              len: [3, 20]
            },
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: true,
            },
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                'Habilitado',
                'Inhabilitado'
            ),
            allowNull: false
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return User;
};
