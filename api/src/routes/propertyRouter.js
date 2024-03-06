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
    createPropertyHandler,
    updatePropertyHandler,
    deletePropertyHandler,
    getPropertyHandler,
    getPropertyByIdHandler,
    findPropertyByTokenHandler
} = require('../handlers/propertyHandler');

const propertyRouter = Router();

propertyRouter.post('/', createPropertyHandler);
propertyRouter.put('/:propertyId', updatePropertyHandler);
propertyRouter.delete('/:propertyId', deletePropertyHandler);
propertyRouter.get('/', getPropertyHandler);
propertyRouter.get('/:propertyId', getPropertyByIdHandler);

propertyRouter.post('/token', findPropertyByTokenHandler);

module.exports = propertyRouter;