const ContactForm = require('../modelsNoSql/contactForm');
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
        const errorMessage = `Error en createContactForm Controller, no se pudo crear el contacto ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getContactForm = async() =>{
    try {
       const contactForms = await ContactForm.find();
       return contactForms; 
    } catch (error) {
        const errorMessage = `Error en getContactForm Controller, no se pudo traer los contactos ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteContactForm = async(contactFormId) =>{
    try {
        const deletedForm = await ContactForm.findByIdAndDelete(contactFormId);
        logger.info('Registro de Formulario de Contacto eliminado con éxito');
        return deletedForm;

    } catch (error) {
        const errorMessage = `Error en deleteContactForm Controller, no se pudo eliminar este contacto ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports = {
    createContactForm,
    getContactForm,
    deleteContactForm
};