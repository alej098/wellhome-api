const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js');

const {
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceById

} = require ('../controllers/mainPlaceControllers');

const createMainPlaceHandler = async (req, res) => {
    const {
        id,
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        ManagementCoCompanyRUC
    } = req.body;

    try{
        const newMainPlace = await createMainPlace (
        id,
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        ManagementCoCompanyRUC
        );
        logger.info('Creación Exitosa de Condominio');
        handleSuccessResponse(res, newMainPlace, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const updateMainPlaceHandler = async (req, res) =>{
    const {mainPlaceId} = req.params;
    const {
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        managementCoId
    } = req.body;
    try {
        const mainPlace = await updateMainPlace (
        mainPlaceId,
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        managementCoId
        );
        logger.info('Creación Exitosa de Condominio');
        handleSuccessResponse(res, mainPlace);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const deleteMainPlaceHandler =  async (req, res) => {
    const{mainPlaceId} = req.params;
    try{
        const deletePlace = await deleteMainPlace(mainPlaceId);
        logger.info('El condominio se eliminó exitosamente');
        handleSuccessResponse(res, deletePlace);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getMainPlaceHandler =  async (req, res) => {
    try {
        const allPlaces = await getAllMainPlace();
        logger.info('Se trajeron todos los condominios exitosamente');
        handleSuccessResponse(res, allPlaces);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getMainPlaceByIdHandler = async (req, res) => {
    const {mainPlaceId} = req.params;
    try {
        const mainPlaceById = await getMainPlaceById(mainPlaceId);
        logger.info('Creación Exitosa de Condominio');
        handleSuccessResponse(res, mainPlaceById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


module.exports = {
    createMainPlaceHandler,
    updateMainPlaceHandler,
    deleteMainPlaceHandler,
    getMainPlaceHandler,
    getMainPlaceByIdHandler
};