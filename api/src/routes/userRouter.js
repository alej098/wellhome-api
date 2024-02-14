const {Router} = require("express");

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
userRouter.put('/:idUser', updateUserHandler);
userRouter.delete('/:idUser', deleteUserHandler);

userRouter.get('/', getUserHandler);
userRouter.get('/:idUser', getUserByIdHandler);

userRouter.patch('/change-password', changePasswordHandler);

module.exports = userRouter;