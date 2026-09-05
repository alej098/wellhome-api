require('dotenv').config();
const {User, UserType} =  require ("../db");
const logger = require('../utils/logger');
const {JWT_SECRET} = process.env;
const securityUtils = require('../utils/security')

const userLogin = async (login, password) => {
    try {
        const user = await User.findOne({
            where:{
                email: login,
                isSuspended: false,
            },
            include: [{
                model: UserType,
                attributes: ['id', 'name'],
                through: { attributes: [] },
            }],
        });
        if (!user) {
            throw new Error('Usuario no encontrado');      
        }

        const isMatch = await securityUtils.comparePasswords(password, user.password);

        if (!isMatch) {
            throw new Error('Contraseña inválida');
        }

        const token = securityUtils.generateToken({ dni: user.dni }, JWT_SECRET, 86400);
        if (user.dataValues) {
            delete user.dataValues.password;
        }
        logger.info(`Inicio de sesión exitoso para el usuario con email: ${login}`);

        return {user, token};

    } catch (error) {
        const errorMessage = `Error en userLogin Controller, no se pudo iniciar sesion ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
    };

module.exports = {userLogin};
