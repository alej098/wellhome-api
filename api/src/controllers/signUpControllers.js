const {User, UserClass, UserType, UserRol, Property, MainPlace} = require('../db')
const {JWT_SECRET} = process.env;
const securityUtils = require('../utils/security');
const { getArrayByIds, validateFunctionalToken } = require('../utils/utils');

const signUp = async(
    propertyToken,
    UserTypeId,
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
        const arrayOfUserType = await getArrayByIds(UserType, UserTypeId);
        const defaultUserRole = UserRolId ? undefined : await UserRol.findOne({
            where: { id: '03-User' },
        });

        const newSignUp = {
            UserTypeId,
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
        await newUserSignUp.setUserTypes(arrayOfUserType);
    
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