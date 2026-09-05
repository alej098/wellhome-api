const { handleSuccessResponse, handleErrorResponse } = require('../utils/utils.js');

const {
    createResidentForm
} = require('../controllers/residentRegisterControllers');

const createResidentFormHandler = async (req, res) => {
    const {
        foreName,
        lastName,
        dni,
        phone,
        email,
        password,
        userType,
        checkbox_confirm
    } = req.body;

    try {
        const residentForm = await createResidentForm(
            foreName,
            lastName,
            dni,
            phone,
            email,
            password,
            userType,
            checkbox_confirm
        );
        handleSuccessResponse(res, residentForm, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports = {
    createResidentFormHandler
};