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
            allowNull: false
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
    });
    return Fee;
};