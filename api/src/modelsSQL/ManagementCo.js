const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    const ManagementCo = sequelize.define('ManagementCo',{
        
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
        companyTaxId: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyContact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyPhone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        companyEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate : {
                isEmail: true,
            }
        },
        logo: {
            type: DataTypes.STRING,
            validate: {
              isUrl: true
            }
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return ManagementCo;
};