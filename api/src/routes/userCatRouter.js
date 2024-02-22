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
    createClassUserHandler,
    createTypeUserHandler,
    updateClassUserHandler,
    updateTypeUserHandler,
    deleteClassUserHandler,
    deleteTypeUserHandler,
    getClassUserHandler,
    getTypeUserHandler,
    getClassUserByIdHandler,
    getTypeUserByIdHandler
} = require ('../handlers/userCatHandler');

const userCatRouter = Router();

userCatRouter.post('/class', createClassUserHandler);
userCatRouter.post('/type', createTypeUserHandler);

userCatRouter.put('/class/:classId', updateClassUserHandler);
userCatRouter.put('/type/:typeId', updateTypeUserHandler);

userCatRouter.delete('/class/:classId', deleteClassUserHandler);
userCatRouter.delete('/type/:typeId', deleteTypeUserHandler);

userCatRouter.get('/class', getClassUserHandler);
userCatRouter.get('/type', getTypeUserHandler);

userCatRouter.get('/class/:classId', getClassUserByIdHandler);
userCatRouter.get('/type/:typeId', getTypeUserByIdHandler);

module.exports = userCatRouter;