const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js');

const {
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceByName,
    getMainPlaceById

} = require ('../controllers/mainPlaceControllers');

const createMainPlaceHandler = async (req, res) => {
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
        ManagementCoId
    } = req.body;

    try{
        const newMainPlace = await createMainPlace (
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
        ManagementCoId
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


const getMainPlaceByNameHandler = async (req, res) => {
    try {
      const { mainPlaceName } = req.params;
      const mainPlacesByName = await getMainPlaceByName(mainPlaceName);
      logger.info('Se trajeron exitosamente los Condominios por nombre');
      handleSuccessResponse(res, mainPlacesByName);
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
    getMainPlaceByNameHandler,
    getMainPlaceByIdHandler
};