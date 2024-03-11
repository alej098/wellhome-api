const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const MainPlace = sequelize.define('MainPlace', {
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            unique: true,
            validate:{
                len: [5, 30]
            },
            allowNull: false,  
        },
        country:{
            type: DataTypes.ENUM(
                'PERU', 
                'CHILE', 
                'ARGENTINA', 
                'COLOMBIA',
                'BOLIVIA', 
                'ECUADOR', 
                'VENEZUELA', 
                'URUGUAY', 
                'PARAGUAY', 
                'MEXICO'
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
        address1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        placeDescription: {
            type: DataTypes.STRING,
            validate: {
                len: [10, 300]
            },
            allowNull: true
        },
        placeImage: {
            type:DataTypes.STRING,
            validate: {
                isUrl: true
            },
            allowNull: false
            //Pendiente colocar imagen por defecto en caso que no se suba una
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: true,
            },
            allowNull: true,
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, //Borrado Lógico
          },

    });
    return MainPlace;
};