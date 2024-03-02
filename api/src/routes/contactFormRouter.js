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
    createContactFormHandler,
    getContactFormHandler,
    deleteContactFormHandler
} = require('../handlers/contactFormHandler');

const contactFormRouter = Router();

contactFormRouter.post('/', createContactFormHandler);
contactFormRouter.get('/', getContactFormHandler);
contactFormRouter.delete('/:contactFormId', deleteContactFormHandler);

module.exports = contactFormRouter;