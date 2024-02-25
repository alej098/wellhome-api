const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    const Fee = sequelize.define('Fee', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        feeDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueFeePerPlace'
        },
        currency : {
            type: DataTypes.ENUM(
                'Sol',
                'Pesos',
                'Dolares'
            ),
            allowNull: false
        },
        amount :{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    // {
    //     indexes:[
    //         {
    //             unique: true,
    //             fields: ['feeDescription, MainPlaceId'],
    //             name:'uniqueFeePerPlace'
    //         }
    //     ]
    // }
    );
    return Fee;
};