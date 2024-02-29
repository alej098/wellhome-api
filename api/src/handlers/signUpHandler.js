const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {signUp} = require('../controllers/signUpControllers');

const singUpHandler = async (req, res) => {
    const {
        propertyToken,
        UserTypeId,
        dni,
        foreName,
        lastName,
        phone,
        email,
        password,
    } = req.body;
    try {
        const {newUserSignUp, token} = await signUp (
            propertyToken,
            UserTypeId,
            dni,
            foreName,
            lastName,
            phone,
            email,
            password
        );
        logger.info(`Registro exitoso de ${foreName} ${lastName} (${email})`);
        handleSuccessResponse(res, {newUserSignUp,token}, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports = {singUpHandler};
