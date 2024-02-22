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
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUserByIdHandler,
    changePasswordHandler
} = require ('../handlers/userHandler');

const userRouter = Router();

userRouter.post('/', createUserHandler);
userRouter.put('/:userId', updateUserHandler);
userRouter.delete('/:userId', deleteUserHandler);

userRouter.get('/', getUserHandler);
userRouter.get('/:userId', getUserByIdHandler);

userRouter.patch('/change-password', changePasswordHandler);

module.exports = userRouter;