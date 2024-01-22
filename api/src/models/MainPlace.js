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
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: true,
            },
            allowNull: false,
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, //Borrado Lógico
          },

    });
    return MainPlace;
};