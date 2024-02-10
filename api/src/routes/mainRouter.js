const { Router } = require("express");

const managementCoRouter = require ("./managementCoRouter");
const mainPlaceRouter = require ("./mainPlaceRouter");
const userCatRouter = require ("./userCatRouter");
const signUpRouter = require ("./signUpRouter");
const userRouter = require ("./userRouter");
const loginRouter = require ("./loginRouter");
const propertyRouter =  require ("./propertyRouter");
const componentRouter = require ("./componentRouter");
const feeRouter = require ("./feeRouter");


const mainRouter = Router();

mainRouter.use("/managementco", managementCoRouter);
mainRouter.use("/mainplace", mainPlaceRouter);
mainRouter.use("/component", componentRouter);
mainRouter.use("/usercat", userCatRouter);
mainRouter.use("/signup", signUpRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/property", propertyRouter);
mainRouter.use("/fee", feeRouter);


module.exports = mainRouter;