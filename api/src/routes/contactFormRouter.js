const {Router} = require('express');

const {
    createContactFormHandler,
    getContactFormHandler,
    deleteContactFormHandler
} = require('../handlers/contactFormHandler');

const contactFormRouter = Router();

contactFormRouter.post('/', createContactFormHandler);
contactFormRouter.get('/', getContactFormHandler);
contactFormRouter.delete('/:contactFormId', deleteContactFormHandler);

module.exports = contactFormRouter;