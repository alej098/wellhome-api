const { Router } = require("express");

const managementCoRouter = require ("./managementCoRouter");
const mainPlaceRouter = require ("./mainPlaceRouter");
const propertyRouter =  require ("./propertyRouter");
const feeRouter = require ("./feeRouter");
const componentRouter = require ("./componentRouter");
const userCatRouter = require ("./userCatRouter");
const userRouter = require ("./userRouter");

//Autenticacion
const signUpRouter = require ("./signUpRouter");
const loginRouter = require ("./loginRouter");


const mainRouter = Router();

mainRouter.use("/managementco", managementCoRouter);
mainRouter.use("/mainplace", mainPlaceRouter);
mainRouter.use("/property", propertyRouter);
mainRouter.use("/fee", feeRouter);
mainRouter.use("/component", componentRouter);
mainRouter.use("/usercat", userCatRouter);
mainRouter.use("/users", userRouter);

//Autenticacion
mainRouter.use("/signup", signUpRouter);
mainRouter.use("/login", loginRouter);

module.exports = mainRouter;