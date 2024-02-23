const ContactForm = require('../modelsNoSql/ContactForm');
const logger = require('../utils/logger');

const createContactForm = async(
    country,
    foreName,
    lastName,
    email,
    phone,
    subject,
    message
) => {
    try {
        const newContactForm = await ContactForm(
            {
                country,
                foreName,
                lastName,
                email,
                phone,
                subject,
                message
            }
        );
        await newContactForm.save();
        logger.info('Nuevo Formulario de Contacto creado con éxito');
        return newContactForm; 
    } catch (error) {
        logger.error(`Error al llenar el Formulario de Contacto desde el controlador: ${error.message}`);
        throw newError('Error creando el formulario de contacto');
    }
};


const getContactForm = async() =>{
    try {
       const contactForms = await ContactForm.find();
       return contactForms; 
    } catch (error) {
        logger.error(`Error al traer a todos los registros del Formulario de Contacto desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los registros del Formulario de Contacto');
    }
};

const deleteContactForm = async(contactFormId) =>{
    try {
        const deletedForm = await ContactForm.findByIdAndDelete(contactFormId);
        logger.info('Registro de Formulario de Contacto eliminado con éxito');
        return deletedForm;

    } catch (error) {
        logger.error(`Error al eliminar un registro del Formulario de Contacto desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar un registro del Formulario de Contacto');
    }
};

module.exports = {
    createContactForm,
    getContactForm,
    deleteContactForm
};