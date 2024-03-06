const logger = require('../utils/logger');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils');

const {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    getPropertyById,
    findPropertyByToken
} = require('../controllers/propertyControllers');

const createPropertyHandler = async (req, res) => {
    const {
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
        UserDni,
        token
        
    } = req.body;
    try {
        const newProperty = await createProperty(
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
            UserDni,
            token
            
        )
        logger.info('creación Exitosa de Propiedad');
        handleSuccessResponse(res, {newProperty, token}, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const updatePropertyHandler = async (req, res) => {
    const {propertyId} =  req.params;
    const {
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
    } = req.body;
    try {
        const updateNewProperty = await updateProperty(
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
        );
        logger.info('Actualización Exitosa de la Propiedad');
        handleSuccessResponse(res, updateNewProperty);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const deletePropertyHandler = async (req, res) => {
    const {propertyId} = req.params;
    try {
        const deletedProperty = await deleteProperty(propertyId);
        logger.info('Se eliminó exitosamente la propiedad');
        handleSuccessResponse(res, deletedProperty);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getPropertyHandler = async (req, res) => {
    try {
        const properties = await getProperty()
        logger.info('Se trajeron a todas las Propiedades');
        handleSuccessResponse(res, properties);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getPropertyByIdHandler = async (req, res) => {
    const {propertyId} = req.params;
    try {
        const propertyById = await getPropertyById(propertyId);
        logger.info('Se trajo exitosamente la Propiedad');
        handleSuccessResponse(res, propertyById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const findPropertyByTokenHandler = async (req, res) => {
    const {tokenInput} = req.body;
    try {
        const propertyByToken = await findPropertyByToken(tokenInput);
        logger.info('Se encontró la Propiedad asociada al token');
        handleSuccessResponse(res, propertyByToken);
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

module.exports = {
    createPropertyHandler,
    updatePropertyHandler,
    deletePropertyHandler,
    getPropertyHandler,
    getPropertyByIdHandler,
    findPropertyByTokenHandler
};