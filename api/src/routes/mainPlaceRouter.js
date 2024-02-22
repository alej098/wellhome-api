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
    createMainPlaceHandler,
    updateMainPlaceHandler,
    deleteMainPlaceHandler,
    getMainPlaceHandler,
    getMainPlaceByIdHandler
} = require ('../handlers/mainPlaceHandler');

const mainPlaceRouter = Router();

mainPlaceRouter.post('/', createMainPlaceHandler);
mainPlaceRouter.put('/:idMainPlace', updateMainPlaceHandler);
mainPlaceRouter.delete('/:idMainPlace', deleteMainPlaceHandler);

mainPlaceRouter.get('/', getMainPlaceHandler);
mainPlaceRouter.get('/:idMainPlace', getMainPlaceByIdHandler);



module.exports =  mainPlaceRouter;