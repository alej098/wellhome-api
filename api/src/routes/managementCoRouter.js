const {Router} = require("express");
const {verifyToken} = require ('../controllers/authTokenControllers');

const {
    createManagementCoHandler,
    updateManagementCoHandler,
    deleteManagementCoHandler,
    getManagementCoHandler,
    getManagementCoByIdHandler
} = require('../handlers/managementCoHandler');

const managementCoRouter = Router();

managementCoRouter.post('/',createManagementCoHandler);
managementCoRouter.put('/:idCompany', updateManagementCoHandler);
managementCoRouter.delete('/:idCompany', deleteManagementCoHandler);

managementCoRouter.get('/', verifyToken, getManagementCoHandler);
managementCoRouter.get('/:idCompany', getManagementCoByIdHandler);


module.exports = managementCoRouter;