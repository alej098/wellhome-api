const {Router} = require("express");
const {verifyToken} = require ('../controllers/authTokenControllers');

const {singUpHandler} = require ('../handlers/signUpHandler');

const signUpRouter = Router();

//Proteger ruta
signUpRouter.post('/', singUpHandler);

module.exports = signUpRouter;