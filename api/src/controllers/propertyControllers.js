const {Property, MainPlace, User, Fee} = require ('../db');
const {getArrayByIds, checkExistence} = require('../utils/utils');

const createProperty = async(
    id,
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
        const arrayOfUserDni = await getArrayByIds(User, UserDni);
        const newProperty = await Property.create({
                id,
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
            }
        );
        await newProperty.setUsers(arrayOfUserDni);
        logger.info('Nueva Propiedad creada con éxito.');
        return newProperty;

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
        property.secondaryGrouper = secondaryGrouperNumber;
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

module.exports ={ 
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    getPropertyById
};