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


const {singUpHandler} = require ('../handlers/signUpHandler');

const signUpRouter = Router();

//Proteger ruta
signUpRouter.post('/', singUpHandler);

module.exports = signUpRouter;