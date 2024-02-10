const {Router} = require('express')
const { userLoginHandler } = require("../handlers/userLoginHandler")

const loginRouter = Router();

loginRouter.post('/', userLoginHandler);

module.exports = loginRouter;
