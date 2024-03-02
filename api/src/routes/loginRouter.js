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
    
const { userLoginHandler } = require("../handlers/userLoginHandler")

const loginRouter = Router();

loginRouter.post('/', userLoginHandler);

module.exports = loginRouter;
