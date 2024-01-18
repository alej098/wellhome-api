const {Router} = require('express');

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

userCatRouter.put('/class/:idClassUser', updateClassUserHandler);
userCatRouter.put('/type/:idTypeUser', updateTypeUserHandler);

userCatRouter.delete('/class/:idClassUser', deleteClassUserHandler);
userCatRouter.delete('/type/:idTypeUser', deleteTypeUserHandler);

userCatRouter.get('/class', getClassUserHandler);
userCatRouter.get('/type', getTypeUserHandler);

userCatRouter.get('/class/:idClassUser', getClassUserByIdHandler);
userCatRouter.get('type/:idTypeUser', getTypeUserByIdHandler);

module.exports = userCatRouter;