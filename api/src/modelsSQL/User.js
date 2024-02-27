const { DataTypes } = require('sequelize');
const securityUtils = require('../utils/security');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        dni: {
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
        password: {
            type: DataTypes.TEXT,
            validate: {
              len: [7]
            },
            allowNull: false,
          },
        status: {
            type: DataTypes.ENUM(
                'Habilitado',
                'Inhabilitado'
            ),
            defaultValue: 'Habilitado',
            allowNull: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        acceptCost: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
      
    },
        
    {
      hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
                  user.password = await securityUtils.hashPassword(user.password);
            }

          },
          beforeUpdate: async (user) => {
              if (user.changed('password')) {
              // Verifica si la contraseña ha sido modificada antes de aplicar el hasheo
              user.password = await securityUtils.hashPassword(user.password);
            }
          }
        }
    });

     User.prototype.validPassword = async function(password) {
      return await bcrypt.compare(password, this.password);
  };

    return User;
};
