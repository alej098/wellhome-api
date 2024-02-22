const {User} = require("../db")
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const signUp = async(
    dni,
    foreName,
    lastName,
    phone,
    email,
    password,
    MainPlaceId
) => {
    try {
        const newSignUp = {
            dni,
            foreName,
            lastName,
            phone,
            email,
            password,
            MainPlaceId
        };
    
        const newUserSignUp = await User.create(newSignUp);
        const token = jwt.sign({dni: newUserSignUp.dni}, JWT_SECRET, {expiresIn: "1d"})
        return {newUserSignUp, token};
    } catch (error) {
        console.error(`Error durante el registro: ${error.message}`);
        throw new Error('Error durante el registro de usuario'); 
    }
    
};

module.exports={signUp};