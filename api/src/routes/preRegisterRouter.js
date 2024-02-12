const {Router} = require("express");

const {
    createPreRegisterFormHandler,
    getPreRegisterFormHandler,
    deletePreRegisterFormHandler
} = require('../handlers/preRegisterHandler');

const preRegisterRouter = Router();

preRegisterRouter.post('/', createPreRegisterFormHandler);
preRegisterRouter.get('/', getPreRegisterFormHandler);
preRegisterRouter.delete('/:formId', deletePreRegisterFormHandler);

module.exports = preRegisterRouter;