const {User} = require('../db')
const securityUtils = require('../utils/security')

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
        const hashedPassword = await securityUtils.hashPassword(password);
        const newSignUp = {
            dni,
            foreName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            MainPlaceId
        };
    
        const newUserSignUp = await User.create(newSignUp);
        const token = securityUtils.generateToken({dni: newUserSignUp.dni}, process.env.JWT_SECRET, 'id');
        return {newUserSignUp, token};
    } catch (error) {
        console.error(`Error durante el registro: ${error.message}`);
        throw new Error('Error durante el registro de usuario'); 
    }
    
};

module.exports={signUp};