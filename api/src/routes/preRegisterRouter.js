const {Router} = require('express');
const { verifyToken,
        isSuperAdmin,
        isLocalAdmin, 
        isModerator, 
        isUser,
        allAccess,
        adminLocalAccess,
        ownerLocalAccess,
        productOwnerAccess
    } = require ('../controllers/authTokenControllers');

const {
    createPreRegisterFormHandler,
    getPreRegisterFormHandler,
    deletePreRegisterFormHandler,

} = require('../handlers/preRegisterHandler');

const preRegisterRouter = Router();

preRegisterRouter.post('/', createPreRegisterFormHandler);
preRegisterRouter.get('/', getPreRegisterFormHandler);
preRegisterRouter.delete('/:preRegisterId', deletePreRegisterFormHandler);


module.exports = preRegisterRouter;