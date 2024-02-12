const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Contact = sequelize.define('Contact', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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

        name:{
            type: DataTypes.STRING,
            unique: true,
            validate:{
                len: [3, 30]
            },
            allowNull: false,  
        },

        lastName:{
            type: DataTypes.STRING,
            unique: true,
            validate:{
                len: [3, 30]
            },
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

        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },

        subject: {
            type: DataTypes.ENUM(
                'Quiero Implementarlo',
                'Necesito mas información',
                'Necesito que se contacten conmigo',
            ),
            allowNull: false
        },

        message: {
            type: DataTypes.STRING,
            validate: {
                len: [10, 500]
            },
            allowNull: false
        }

    });
    return Contact;
};