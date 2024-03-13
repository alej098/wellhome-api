const {User, UserClass, UserType, UserRol, Property, MainPlace} = require('../db')
const {JWT_SECRET} = process.env;
const securityUtils = require('../utils/security');
const { getArrayByIds, validateFunctionalToken } = require('../utils/utils');
const logger = require('../utils/logger');

const signUp = async(
    PropertyId,
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
        const UserClassId = [2];
        const arrayOfProperty = await getArrayByIds(Property, PropertyId);
        const arrayOfUserType = await getArrayByIds(UserType, UserTypeId);
        const defaultUserRole = UserRolId ? undefined : await UserRol.findOne({
            where: { id: '03-User' },
        });

        const newSignUp = {
            PropertyId,
            UserTypeId,
            dni,
            foreName,
            lastName,
            phone,
            email,
            password,
            MainPlaceId,
            UserRolId: UserRolId || (defaultUserRole ? defaultUserRole.id : undefined),
            UserClassId
        };
        // if (propertyToken) {
        //     const property = await validateFunctionalToken(Property, propertyToken, MainPlace);

        //     newSignUp.MainPlaceId = property.MainPlace.id;
        //     newSignUp.PropertyId = [property.id];
            
        // } else {
        //     throw new Error('Token de acceso requerido');
        // }
    
        const newUserSignUp = await User.create(newSignUp);
        await newUserSignUp.setProperties(arrayOfProperty);
        await newUserSignUp.setUserClasses(UserClassId);
        await newUserSignUp.setUserTypes(arrayOfUserType);

        // if (newSignUp.PropertyId && newSignUp.PropertyId.length > 0) {
        //     await newUserSignUp.setProperties(newSignUp.PropertyId);
        // }

        const token = securityUtils.generateToken({ dni: newUserSignUp.dni }, JWT_SECRET, 86400);
        
        return {newUserSignUp, token};

    } catch (error) {
        const errorMessage = `Error en signUp Controller, no se pudo ingresar ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports={signUp};