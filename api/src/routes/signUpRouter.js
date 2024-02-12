const {Router} = require("express");


const {singUpHandler} = require ('../handlers/signUpHandler');

const signUpRouter = Router();

//Proteger ruta
signUpRouter.post('/', singUpHandler);

module.exports = signUpRouter;