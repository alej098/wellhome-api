const {User, UserRol} = require('../db')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
// const securityUtils = require('../utils/security')

const signUp = async(
    dni,
    foreName,
    lastName,
    phone,
    email,
    password,
    MainPlaceId,
    UserRolId
) => {
    try {
        const defaultUserRole = UserRolId ? undefined : await UserRol.findOne({
            where: { id: '03-User' },
        });
        const newSignUp = {
            dni,
            foreName,
            lastName,
            phone,
            email,
            password,
            MainPlaceId,
            UserRolId: UserRolId || (defaultUserRole ? defaultUserRole.id : undefined)
        };
    
        const newUserSignUp = await User.create(newSignUp);
        const token = jwt.sign({dni: newUserSignUp.dni}, JWT_SECRET, {expiresIn: "1d"})
        // const token = securityUtils.generateToken({dni: newUserSignUp.dni}, process.env.JWT_SECRET, 'id');
        return {newUserSignUp, token};
    } catch (error) {
        console.error(`Error durante el registro: ${error.message}`);
        throw new Error('Error durante el registro de usuario'); 
    }
    
};

module.exports={signUp};