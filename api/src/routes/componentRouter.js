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
    createClassComponentHandler,
    createTypeComponentHandler,
    createComponentHandler,

    updateClassComponentHandler,
    updateTypeComponentHandler,
    updateComponentHandler,
    
    deleteClassComponentHandler,
    deleteTypeComponentHandler,
    deleteComponentHandler,

    getClassComponentHandler,
    getTypeComponentHandler,
    getComponentHandler,

    getClassComponentByIdHandler,
    getTypeComponentByIdHandler,
    getComponentByIdHandler

} = require ('../handlers/componentHandler.js');

const componentRouter = Router();

componentRouter.post('/class', createClassComponentHandler);
componentRouter.post('/type', createTypeComponentHandler);
componentRouter.post('/', createComponentHandler);

componentRouter.put('/class/:classComponentId', updateClassComponentHandler);
componentRouter.put('/type/:typeComponentId', updateTypeComponentHandler);
componentRouter.put('/:componentId', updateComponentHandler);

componentRouter.delete('/class/:classComponentId', deleteClassComponentHandler);
componentRouter.delete('/type/:typeComponentId', deleteTypeComponentHandler);
componentRouter.delete('/:componentId', deleteComponentHandler);

componentRouter.get('/class', getClassComponentHandler);
componentRouter.get('/type', getTypeComponentHandler);
componentRouter.get('/', getComponentHandler);

componentRouter.get('/class/:classComponentId', getClassComponentByIdHandler);
componentRouter.get('/type/:typeComponentId', getTypeComponentByIdHandler);
componentRouter.get('/:componentId', getComponentByIdHandler);

module.exports = componentRouter;