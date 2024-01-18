const {Router} = require("express");

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