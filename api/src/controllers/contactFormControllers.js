const {Contact} = require ('../db');

const createContactForm = async(
    country,
    name,
    lastName,
    email,
    phone,
    subject,
    message
) => {
    const newContactForm = await Contact.create(
        {
            country,
            name,
            lastName,
            email,
            phone,
            subject,
            message
        }
    )
    return newContactForm;
};

const getContactForm = async() =>{
    return await Contact.findAll()
};

const deleteContactForm = async(contactFormId) =>{
    const deletedForm = await Contact.destroy({
        where: {id: contactFormId}
    });
    if(!deletedForm) {
        throw new Error ('No existen Registros de Contactos')
    }
    return "el contacto se ha eliminado"
};

module.exports = {
    createContactForm,
    getContactForm,
    deleteContactForm
};