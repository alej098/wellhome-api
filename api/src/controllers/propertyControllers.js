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
        logger.error(`Error al crear una nueva Propiedad desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear una nueva Propiedad');
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
        logger.error(`Error al actualizar una Propiedad desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar una Propiedad');
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
        logger.error(`Error al eliminar una Propiedad desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar una Propiedad');
    }
};


const getProperty = async () => {
    try {
        logger.info('Trayendo todas las Propiedades');
        return await Property.findAll({
            where: {isSuspended: false},
            
        });

    } catch (error) {
        logger.error(`Error al traer todas las propiedades desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todas las propiedades');
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
        logger.error(`Error al traer una Propiedad por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer una Propiedad por Id');
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
        logger.error(`Error al tratar de actualizar una Propiedad por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al tratar de actualizar una Propiedad por Id');
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
        logger.error(`Error al tratar de ejecutar el Borrado Lógico a la propiedad: ${error.message}`);
        throw new Error('Error interno al tratar de aplicar el borrado lógico a la propiedad');
    }
}

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
        logger.error(`Error al comparar Tokens desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer una Propiedad por Token');
    }
}

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