const {User, UserRol, Property, MainPlace} = require('../db')
const {JWT_SECRET} = process.env;
const securityUtils = require('../utils/security');
const { validateFunctionalToken } = require('../utils/utils');

const signUp = async(
    propertyToken,
    dni,
    foreName,
    lastName,
    phone,
    email,
    password,
    MainPlaceId,
    UserRolId,

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
            UserRolId: UserRolId || (defaultUserRole ? defaultUserRole.id : undefined),
        };
        if (propertyToken) {
            const property = await validateFunctionalToken(Property, propertyToken, MainPlace);

            newSignUp.MainPlaceId = property.MainPlace.id;
            newSignUp.PropertyId = [property.id];
            
        } else {
            throw new Error('Token de acceso requerido');
        }
        
        const newUserSignUp = await User.create(newSignUp);
    
        if (newSignUp.PropertyId && newSignUp.PropertyId.length > 0) {
            await newUserSignUp.setProperties(newSignUp.PropertyId);
        }

        const token = securityUtils.generateToken({ dni: newUserSignUp.dni }, JWT_SECRET, 86400);
        
        return {newUserSignUp, token};

    } catch (error) {
        console.error(`Error durante el registro: ${error.message}`);
        throw new Error('Error durante el registro de usuario'); 
    }
    
};

module.exports={signUp};