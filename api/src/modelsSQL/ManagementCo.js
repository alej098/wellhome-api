const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    const ManagementCo = sequelize.define('ManagementCo',{
        
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
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
        companyTaxId: {
            type: DataTypes.STRING,
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