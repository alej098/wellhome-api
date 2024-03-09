const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js');

const {
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceByName,
    getMainPlaceById,
    patchMainPlace,
    logicalDelete

} = require ('../controllers/mainPlaceControllers');

const createMainPlaceHandler = async (req, res) => {
    const {
        name,
        country,
        state,
        city,
        district,
        address1,
        address2,
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
        address1,
        address2,
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
        address1,
        address2,
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
        address1,
        address2,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        managementCoId
        );
        logger.info('Actualización Exitosa de Condominio');
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
        logger.info('Se trajo exitosamente el Condominio');
        handleSuccessResponse(res, mainPlaceById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const patchMainPlaceHandler = async(req, res) =>{
    const {mainPlaceId} = req.params;
    const {
        address1,
        address2,
        placeDescription,
        placeImage,
        phone,
        email
    } = req.body;

    try {
        const updatedMainPlace = await patchMainPlace(
            mainPlaceId,
            address1,
            address2,
            placeDescription,
            placeImage,
            phone,
            email
        )
        logger.info('Se actualizó exitosamente el MainPlace');
        handleSuccessResponse(res, updatedMainPlace);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const logicalDeleteHandler = async(req, res) =>{
    const {mainPlaceId} = req.params;
    const {
        isSuspended
    } = req.body;

    try {
        const mainPlaceDeleted = await logicalDelete(
            mainPlaceId,
            isSuspended
        )
        logger.info('Se eliminó el condominio (borrado lógico');
        handleSuccessResponse(res, mainPlaceDeleted);
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
    getMainPlaceByIdHandler,
    patchMainPlaceHandler,
    logicalDeleteHandler
};
