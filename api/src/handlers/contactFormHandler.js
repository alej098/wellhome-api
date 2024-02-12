const {
    createContactForm,
    getContactForm,
    deleteContactForm
} = require ('../controllers/contactFormControllers')

const createContactFormHandler = async (req, res) => {
    const {
        country,
        name,
        lastName,
        email,
        phone,
        subject,
        message
    } = req.body;
    try {
        const newContactForm = await createContactForm (
            country,
            name,
            lastName,
            email,
            phone,
            subject,
            message
        );
        res.status(201).json(newContactForm);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getContactFormHandler = async (req,res) => {
    try {
        const contactForm = await getContactForm()
        res.status(200).json(contactForm);
    } catch (error) {
        res.status(400).send({error:error.message});
    }
};

const deleteContactFormHandler = async (req, res) => {
    const {contactFormId} = req.params;
    try {
        const destroyContactForm = await deleteContactForm(contactFormId)
        res.status(200).json({destroyContactForm})
    } catch (error) {
        res.status(400).send({error:error.message});
    }
};

module.exports={
    createContactFormHandler,
    getContactFormHandler,
    deleteContactFormHandler
}