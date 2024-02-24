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
    createPreRegisterMainPlaceFormHandler,
    getPreRegisterMainPlaceFormHandler,
    deletePreRegisterMainPlaceFormHandler,

    // createPreRegisterOwnerFormHandler,
    // getPreRegisterOwnerFormHandler,
    // deletePreRegisterOwnerFormHandler
} = require('../handlers/preRegisterHandler');

const preRegisterRouter = Router();

preRegisterRouter.post('/mainplace', createPreRegisterMainPlaceFormHandler);
preRegisterRouter.get('/mainplace', getPreRegisterMainPlaceFormHandler);
preRegisterRouter.delete('/mainplace/:mainPlaceFormId', deletePreRegisterMainPlaceFormHandler);

// preRegisterRouter.post('/owner', createPreRegisterOwnerFormHandler);
// preRegisterRouter.get('/owner', getPreRegisterOwnerFormHandler);
// preRegisterRouter.delete('/owner/mainPlaceId:ownerFormId', deletePreRegisterOwnerFormHandler);

module.exports = preRegisterRouter;