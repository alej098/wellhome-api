const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Property = sequelize.define('Property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        propertyType: {
            type: DataTypes.ENUM(
                'Casa',
                'Departamento',
                'Comercio',
                'Estacionamiento',
                'Terreno'
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
            allownull: false
        },
        subStatus: {
            type: DataTypes.ENUM(
                'Disponible para Venta',
                'Disponible para Alquiler',
                'Regular'
            ),
            allownull: false
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, //Borrado Lógico
          }
    });
    return Property;
};