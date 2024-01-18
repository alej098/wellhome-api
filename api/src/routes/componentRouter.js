const {Router} = require("express");

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

componentRouter.put('/class/:idClassComponent', updateClassComponentHandler);
componentRouter.put('/type/:idTypeComponent', updateTypeComponentHandler);
componentRouter.put('/:idComponent', updateComponentHandler);

componentRouter.delete('/class/:idClassComponent', deleteClassComponentHandler);
componentRouter.delete('/type/:idTypeComponent', deleteTypeComponentHandler);
componentRouter.delete('/:idComponent', deleteComponentHandler);

componentRouter.get('/class', getClassComponentHandler);
componentRouter.get('/type', getTypeComponentHandler);
componentRouter.get('/', getComponentHandler);

componentRouter.get('/class/:idClassComponent', getClassComponentByIdHandler);
componentRouter.get('/type/:idTypeComponent', getTypeComponentByIdHandler);
componentRouter.get('/:idComponent', getComponentByIdHandler);

module.exports = componentRouter;