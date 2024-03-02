const logger = require('../utils/logger')
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')
const { userLogin } = require('../controllers/userLoginControllers');

const userLoginHandler = async (req, res) => {
    const {login, password} = req.body;
    try {
        const {user, token} = await userLogin(login, password);
        handleSuccessResponse(res, {user, token});
    } catch (error) {
        logger.error(`Error durante el proceso de Login`);
        handleErrorResponse(res, error);
    }
};

module.exports = {userLoginHandler};