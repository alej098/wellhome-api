const {
    createPreRegisterForm,
    getPreRegisterForm,
    deletePreRegisterForm
} = require('../controllers/preRegisterControllers');

const createPreRegisterFormHandler = async (req, res) =>{
    const { 
        condoName,
        country,
        state,
        city,
        district,
        placeDescription,
        condoPhone,
        condoEmail,
        ownerId,
        foreName,
        lastName,
        phone,
        email
    } = req.body;

    try{
        const newPreRegisterForm = await createPreRegisterForm (
            condoName,
            country,
            state,
            city,
            district,
            placeDescription,
            condoPhone,
            condoEmail,
            ownerId,
            foreName,
            lastName,
            phone,
            email
        );
        res.status(201).json(newPreRegisterForm);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getPreRegisterFormHandler = async (req, res) => {
    try {
        const allPreRegisterForm = await getPreRegisterForm ();
        res.status(200).json(allPreRegisterForm);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
 };

const deletePreRegisterFormHandler = async (req, res) => {
    const {formId} = req.params;
    try {
        const deletePreRegister = await deletePreRegisterForm(formId);
        res.status(200).json(deletePreRegister);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


module.exports = {
    createPreRegisterFormHandler,
    getPreRegisterFormHandler,
    deletePreRegisterFormHandler
};