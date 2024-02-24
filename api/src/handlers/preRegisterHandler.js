const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {
    createMainPlaceRegister,
    getMainPlaceRegister,
    deleteMainPlaceRegister
} = require('../controllers/preRegisterControllers');

const createPreRegisterMainPlaceFormHandler = async (req, res) =>{
    const { 
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        phone,
        email
    } = req.body;

    try{
        const mainPlaceForm = await createMainPlaceRegister (
            name,
            country,
            state,
            city,
            district,
            placeDescription,
            phone,
            email
        );
        logger.info('Creación Exitosa de Pre-Regisro de Condominio');
        handleSuccessResponse(res, mainPlaceForm, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getPreRegisterMainPlaceFormHandler = async (req, res) => {
    try {
        const allMainPlaceRegister = await getMainPlaceRegister ();
        logger.info('Se trajeron todos los Pre-Regisros de Condominios');
        handleSuccessResponse(res, allMainPlaceRegister);
    } catch (error) {
        handleErrorResponse(res, error);
    }
 };


const deletePreRegisterMainPlaceFormHandler = async (req, res) => {
    const {mainPlaceFormId} = req.params;
    try {
        const deletePreRegister = await deleteMainPlaceRegister(mainPlaceFormId);
        logger.info('Se eliminó exitosamente el Pre-Regisro de Condominio');
        handleSuccessResponse(res, deletePreRegister);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


module.exports = {
    createPreRegisterMainPlaceFormHandler,
    getPreRegisterMainPlaceFormHandler,
    deletePreRegisterMainPlaceFormHandler
};