const ContactForm = require('../modelsNoSql/contactForm');

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
        return newContactForm; 
    } catch (error) {
        throw newError('Error creando el formulario de contacto');
    }
};


const getContactForm = async() =>{
    try {
       const contactForms = await ContactForm.find();
       return contactForms; 
    } catch (error) {
        throw newError('Error trayendo los formularios de contacto');
    }
};

const deleteContactForm = async(contactFormId) =>{
    try {
        const deletedForm = await ContactForm.findByIdAndDelete(contactFormId);
        return deletedForm;

    } catch (error) {
        throw newError('Error eliminando los formularios de contacto');
    }
};

module.exports = {
    createContactForm,
    getContactForm,
    deleteContactForm
};