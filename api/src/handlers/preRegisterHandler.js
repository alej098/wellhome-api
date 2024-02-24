const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {
    createRegister,
    getRegister,
    deleteRegister
} = require('../controllers/preRegisterControllers');

const createPreRegisterFormHandler = async (req, res) =>{
    const { 
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        phone,
        email,
        dni,
        foreName,
        lastName,
        ownerPhone,
        ownerEmail
    } = req.body;

    try{
        const registerForm = await createRegister (
            name,
            country,
            state,
            city,
            district,
            placeDescription,
            phone,
            email,
            dni,
            foreName,
            lastName,
            ownerPhone,
            ownerEmail
        );
        logger.info('Creación Exitosa de Pre-Regisro de Condominio');
        handleSuccessResponse(res, registerForm, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getPreRegisterFormHandler = async (req, res) => {
    try {
        const allPreRegister = await getRegister ();
        logger.info('Se trajeron todos los Pre-Regisros de Condominios');
        handleSuccessResponse(res, allPreRegister);
    } catch (error) {
        handleErrorResponse(res, error);
    }
 };


const deletePreRegisterFormHandler = async (req, res) => {
    const {preRegisterId} = req.params;
    try {
        const deletePreRegister = await deleteRegister(preRegisterId);
        logger.info('Se eliminó exitosamente el Pre-Regisro de Condominio');
        handleSuccessResponse(res, deletePreRegister);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


module.exports = {
    createPreRegisterFormHandler,
    getPreRegisterFormHandler,
    deletePreRegisterFormHandler
};