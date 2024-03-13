const {Property, MainPlace, User, Fee} = require ('../db');
const logger = require('../utils/logger');
const {getArrayByIds, checkExistence} = require('../utils/utils');
const {generateRandomToken} = require('../utils/security');

const createProperty = async(
    id,
    country,
    propertyType,
    mainGrouper,
    mainGrouperName,
    mainGrouperNumber,
    secondaryGrouper,
    secondaryGrouperNumber,
    status,
    subStatus,
    acceptCost,
    isSuspended,
    MainPlaceId,
    FeeId,
    UserDni,
    token
    
) => {
    try {
        let isTokenUnique = false;
        // Esta lógica para el manejo de colisiones debe cambiar cuando se tenga alta concurrencia
        while (!isTokenUnique) {
            token = generateRandomToken();
            const existingProperty = await Property.findOne({ where: { token } });

            if (!existingProperty) {
                isTokenUnique = true;
            } else {
                token = generateRandomToken();
            }
        }

        const arrayOfUserDni = await getArrayByIds(User, UserDni);
        const newProperty = await Property.create({
                id,
                country,
                propertyType,
                mainGrouper,
                mainGrouperName,
                mainGrouperNumber,
                secondaryGrouper,
                secondaryGrouperNumber,
                status,
                subStatus,
                acceptCost,
                isSuspended,
                MainPlaceId,
                FeeId,
                UserDni,
                token
        
            }
        );
        await newProperty.setUsers(arrayOfUserDni);
        logger.info('Nueva Propiedad creada con éxito.');
        return {newProperty, token};

    } catch (error) {
        const errorMessage = `Error en createProperty Controller, no se pudo crear la propiedad ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const updateProperty = async (
    propertyId,
    propertyType,
    mainGrouper,
    mainGrouperName,
    mainGrouperNumber,
    secondaryGrouper,
    secondaryGrouperNumber,
    status,
    subStatus,
    acceptCost,
    isSuspended,
    MainPlaceId,
    FeeId,
    UserDni
) => {
    try {
        logger.info('Actualizando la propiedad...');
        const property = await checkExistence(Property, propertyId)

        property.propertyType = propertyType;
        property.mainGrouper = mainGrouper;
        property.mainGrouperName =  mainGrouperName;
        property.mainGrouperNumber = mainGrouperNumber;
        property.secondaryGrouper = secondaryGrouper;
        property.secondaryGrouperNumber = secondaryGrouperNumber;
        property.status = status;
        property.subStatus = subStatus;
        property.acceptCost = acceptCost;
        property.isSuspended = isSuspended;
        property.MainPlaceId = MainPlaceId;
        property.FeeId = FeeId;
        property.UserDni = UserDni;

        await property.save();

        const arrayOfUserDni = await getArrayByIds(User, UserDni);
        await property.setUsers(arrayOfUserDni);
        logger.info('Propiedad actualizada con éxito');
        return property;

    } catch (error) {
        const errorMessage = `Error en updateProperty Controller, no se pudo actualizar la propiedad ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const deleteProperty = async (propertyId) => {
    try {
        logger.info('Eliminando una Propiedad');
        const property = await checkExistence (Property, propertyId)
        await property.destroy();
        logger.info('Propiedad eliminada con éxito');
        return {message: 'Propiedad eliminada exitosamente'};

    } catch (error) {
        const errorMessage = `Error en deleteProperty Controller, no se pudo eliminar la propiedad ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getProperty = async () => {
    try {
        logger.info('Trayendo todas las Propiedades');
        return await Property.findAll({
            where: {isSuspended: false,},
            
        });

    } catch (error) {
        const errorMessage = `Error en getProperty Controller, no se pudo traer todas las propiedades ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getPropertyById = async (propertyId) => {
    try {
        logger.info('Trayendo una Propiedad por Id')
        const propertyById = await Property.findByPk(propertyId, {
            include:[{
                model: MainPlace,
                attributes: ['name']
            }],
            include:[{
                model: Fee,
                attributes: ['feeDescription']
            }]
        });
        if(!propertyById) throw Error('No existen propiedades con ese Id');
        return propertyById;
    } catch (error) {
        const errorMessage = `Error en getPropertyById Controller, no se pudo traer la propiedad por id ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const patchProperty = async (
        propertyId,
        propertyType,
        mainGrouper,
        mainGrouperName,
        mainGrouperNumber,
        secondaryGrouper,
        secondaryGrouperNumber,
        status,
        subStatus,
        acceptCost
) => {
    try {
        const updatedProperty =  await checkExistence(Property, propertyId);
        await updatedProperty.update({
            propertyType,
            mainGrouper,
            mainGrouperName,
            mainGrouperNumber,
            secondaryGrouper,
            secondaryGrouperNumber,
            status,
            subStatus,
            acceptCost
        },
        {
            where :{id: propertyId}
        })
        return updatedProperty;
    } catch (error) {
        const errorMessage = `Error en patchProperty Controller, no se pudo actualizar la propiedad ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const logicalDelete = async (
    propertyId,
    isSuspended
) => {
    try {
        const deletedProperty = await checkExistence(Property, propertyId);
        await deletedProperty.update({
            isSuspended
        },
        {
            where :{id: propertyId}
        })
        return deletedProperty;
    } catch (error) {
        const errorMessage = `Error en logicalDelete Controller, no se pudo utilizar el borrado logico ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const findPropertyByToken = async (token) => {
    try {
        logger.info('Buscando una Propiedad que coincida con el Token')
        const property = await Property.findOne({
            where:{
                token: token,
                isSuspended: false,
            },
            include:
            [{
                model: MainPlace,
                attributes: ['name']
            }]
        });
        if(!property) throw Error ('El token ingresado no coincide con ninguna vivienda registrada');
        return property;
        
    } catch (error) {
        const errorMessage = `Error en findPropertyByToken Controller, no se pudo encontrar el token en los registros ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports ={ 
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    getPropertyById,
    patchProperty,
    logicalDelete,
    findPropertyByToken
};