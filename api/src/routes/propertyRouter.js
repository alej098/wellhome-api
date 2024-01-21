const {Router} = require("express");

const {
    createPropertyHandler,
    updatePropertyHandler,
    deletePropertyHandler,
    getPropertyHandler,
    getPropertyByIdHandler
} = require('../handlers/propertyHandler');

const propertyRouter = Router();

propertyRouter.post('/', createPropertyHandler);
propertyRouter.put('/:propertyId', updatePropertyHandler);
propertyRouter.delete('/:propertyId', deletePropertyHandler);
propertyRouter.get('/', getPropertyHandler);
propertyRouter.get('/:propertyId', getPropertyByIdHandler);

module.exports = propertyRouter;