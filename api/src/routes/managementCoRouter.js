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
    createManagementCoHandler,
    updateManagementCoHandler,
    deleteManagementCoHandler,
    getManagementCoHandler,
    getManagmentCoNoSuspendedHandler,
    getManagementCoByNameHandler,
    getManagementCoByIdHandler
} = require('../handlers/managementCoHandler');

const managementCoRouter = Router();

managementCoRouter.post('/',createManagementCoHandler);
managementCoRouter.put('/:companyId', updateManagementCoHandler);
managementCoRouter.delete('/:companyId', deleteManagementCoHandler);

managementCoRouter.get('/', [verifyToken, isUser], getManagementCoHandler);
managementCoRouter.get('/nosuspended',getManagmentCoNoSuspendedHandler);
managementCoRouter.get('/name/:companyname', getManagementCoByNameHandler);
managementCoRouter.get('/:companyId', getManagementCoByIdHandler);


module.exports = managementCoRouter;