require('dotenv').config();
const {User} =  require ("../db");
const logger = require('../utils/logger');
const {JWT_SECRET} = process.env;
const securityUtils = require('../utils/security')

const userLogin = async (login, password) => {
    try {
        const user = await User.findOne({
            where:{
                email: login,
                isSuspended: false,
            }
        });
        if (!user) {
            throw new Error('Usuario no encontrado');      
        }

        const isMatch = await securityUtils.comparePasswords(password, user.password);

        if (!isMatch) {
            throw new Error('Contraseña inválida');
        }

        const token = securityUtils.generateToken({ dni: user.dni }, JWT_SECRET, 86400);
        logger.info(`Inicio de sesión exitoso para el usuario con email: ${login}`);

        return {user, token};

    } catch (error) {
        logger.error(`Error durante el proceso de login: ${error.message}`);
        throw new Error(`Error durante el proceso de login: ${error.message}`);
    }
    
}

module.exports = {userLogin};
