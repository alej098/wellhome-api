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
    getMainPlaceByNameHandler,
    getMainPlaceByIdHandler
} = require ('../handlers/mainPlaceHandler');

const mainPlaceRouter = Router();

mainPlaceRouter.post('/', createMainPlaceHandler);
mainPlaceRouter.put('/:mainPlaceId', updateMainPlaceHandler);
mainPlaceRouter.delete('/:mainPlaceId', deleteMainPlaceHandler);

mainPlaceRouter.get('/', getMainPlaceHandler);
mainPlaceRouter.get('/name/:mainPlaceName', getMainPlaceByNameHandler); //Es necesaria esta ruta adicional? /name/:name
mainPlaceRouter.get('/:mainPlaceId', getMainPlaceByIdHandler);



module.exports =  mainPlaceRouter;