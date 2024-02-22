const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const PreRegister = sequelize.define('PreRegister', {

        //Datos del Condo que debe llenar el propietario en el pre-registro
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        condoName:{
            type: DataTypes.STRING,
            validate:{
                len: [5, 30]
            },
            allowNull: false,  
        },
        country:{
            type: DataTypes.ENUM(
                'Perú',
                'Chile',
                'Argentina',
                'Bolivia',
                'Colombia',
                'Ecuador',
                'Venezuela',
                'Uruguay',
                'Paraguay',
                'México'
            ),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        placeDescription: {
            type: DataTypes.STRING,
            validate: {
                len: [10, 300]
            },
            allowNull: false
        },
        condoPhone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        condoEmail: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: true,
            },
            allowNull: true
        },
        
    //Datos del Owner o SuperAdmin local

        ownerId: {
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
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
            isEmail: true,
            },
            allowNull: false,
        },
    });
    return PreRegister;
};