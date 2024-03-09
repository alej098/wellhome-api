const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Property = sequelize.define('Property', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allownull: false,
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
        propertyType: {
            type: DataTypes.ENUM(
                'Casa',
                'Departamento',
                'Comercio',
                'Estacionamiento',
                'Terreno', 
                'Almacén',
                'Otro'
            ),
            allownull:false,            
        },
        mainGrouper: {
            type: DataTypes.ENUM(
                'Avenida',
                'Calle',
                'Jirón',
                'Manzana',
                'Quinta',
                'Edificio'
            ),
            allownull:false,            
        },
        mainGrouperName: {
            type: DataTypes.STRING,
            allownull: false
        },
        mainGrouperNumber: {
            type: DataTypes.STRING,
            allownull: false
        },
        secondaryGrouper: {
            type: DataTypes.STRING,
            allownull: true
        },
        secondaryGrouperNumber: {
            type: DataTypes.STRING,
            allownull: true
        },
        status: {
            type: DataTypes.ENUM(
                'Ocupado',
                'Desocupado'
            ),
            defaultValue: 'Ocupado',
            allownull: false
        },
        subStatus: {
            type: DataTypes.ENUM(
                'Disponible para Venta',
                'Disponible para Alquiler',
                'Regular'
            ),
            defaultValue: 'Regular',
            allownull: false
        },
        acceptCost: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, //Borrado Lógico
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        }
    });
    return Property;
};