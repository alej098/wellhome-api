const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {
    createContactForm,
    getContactForm,
    deleteContactForm
} = require ('../controllers/contactFormControllers')

const createContactFormHandler = async (req, res) => {
    const {
        country,
        foreName,
        lastName,
        email,
        phone,
        subject,
        message
    } = req.body;
    try {
        const newContactForm = await createContactForm (
            country,
            foreName,
            lastName,
            email,
            phone,
            subject,
            message
        );
        logger.info('Creación Exitosa de Formulario de Contacto');
        handleSuccessResponse(res, newContactForm, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getContactFormHandler = async (req,res) => {
    try {
        const contactForm = await getContactForm()
        logger.info('Se trajeron todos los Formularios');
        handleSuccessResponse(res, contactForm);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const deleteContactFormHandler = async (req, res) => {
    const {contactFormId} = req.params;
    try {
        const destroyContactForm = await deleteContactForm(contactFormId)
        logger.info('Se eliminó exitosamente el Formulario');
        handleSuccessResponse(res, destroyContactForm);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports={
    createContactFormHandler,
    getContactFormHandler,
    deleteContactFormHandler
}