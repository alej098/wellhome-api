require('dotenv').config();
const {User} =  require ("../db");
const bcrypt =  require ('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const {JWT_SECRET} = process.env;

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
    
        const isMatch =  await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña inválida');
        }
        const token = jwt.sign({dni: user.dni}, JWT_SECRET, {expiresIn: '1d'});
        logger.info(`Inicio de sesión exitoso para el usuario con email: ${login}`);

        return {user, token};

    } catch (error) {
        logger.error(`Error durante el proceso de login: ${error.message}`);
        throw new Error(`Error durante el proceso de login: ${error.message}`);
    }
    
}

module.exports = {userLogin};
