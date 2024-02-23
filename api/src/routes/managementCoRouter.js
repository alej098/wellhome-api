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
    getManagementCoByIdHandler
} = require('../handlers/managementCoHandler');

const managementCoRouter = Router();

managementCoRouter.post('/',createManagementCoHandler);
managementCoRouter.put('/:companyId', updateManagementCoHandler);
managementCoRouter.delete('/:companyId', deleteManagementCoHandler);

managementCoRouter.get('/', getManagementCoHandler);
managementCoRouter.get('/:companyId', getManagementCoByIdHandler);


module.exports = managementCoRouter;