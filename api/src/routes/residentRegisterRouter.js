const {Router} = require('express');

const {
    createResidentFormHandler
} = require('../handlers/residentRegisterHandler');

const residentRegisterRouter = Router();

residentRegisterRouter.post('/', createResidentFormHandler);

module.exports = residentRegisterRouter;