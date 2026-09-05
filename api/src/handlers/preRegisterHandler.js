const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {
    createRegister,
    getRegister,
    deleteRegister
} = require('../controllers/preRegisterControllers');

const normalizeCountry = (country) => {
    if (!country || typeof country !== 'string') return country;
    const upper = country.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const allowed = ['PERU', 'CHILE', 'ARGENTINA', 'COLOMBIA', 'BOLIVIA', 'ECUADOR', 'VENEZUELA', 'URUGUAY', 'PARAGUAY', 'MEXICO'];
    return allowed.includes(upper) ? upper : 'PERU';
};

const createPreRegisterFormHandler = async (req, res) =>{
    const { 
        name,
        state,
        city,
        district,
        placeDescription,
        phone,
        // email,
        foreName,
        lastName,
        dni,
        ownerPhone,
        ownerEmail,
        password,
        repeat_password,
        checkbox_confirm

    } = req.body;
    const country = normalizeCountry(req.body.country);

    try{
        const registerForm = await createRegister (
            name,
            country,
            state,
            city,
            district,
            placeDescription,
            phone,
            // email,
            foreName,
            lastName,
            dni,
            ownerPhone,
            ownerEmail,
            password,
            repeat_password,
            checkbox_confirm
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