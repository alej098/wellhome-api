require('dotenv').config();
const {User} =  require ("../db");
const bcrypt =  require ('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const userLogin = async (login, password) => {
    const user = await User.findOne({
        where:{
            email: login,
            isSuspended: false,
        }
    });
    if (!user) {
        throw new Error("Usuario no encontrado");      
    }

    const isMatch =  await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Contraseña inválida");
    }
    const token = jwt.sign({dni: user.dni}, JWT_SECRET, {expiresIn: "1d"})
    return {user, token};
}

module.exports = {userLogin};
