const { Router } = require("express");

const managementCoRouter = require ("./managementCoRouter");
const mainPlaceRouter = require ("./mainPlaceRouter");
const userCatRouter = require ("./userCatRouter");
const userRouter = require ("./userRouter");
const propertyRouter =  require ("./propertyRouter");
const componentRouter = require ("./componentRouter");
const feeRouter = require ("./feeRouter");


const mainRouter = Router();

mainRouter.use("/managementco", managementCoRouter);
mainRouter.use("/mainplace", mainPlaceRouter);
mainRouter.use("/component", componentRouter);
mainRouter.use("/usercat", userCatRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/property", propertyRouter);
mainRouter.use("/fee", feeRouter);


module.exports = mainRouter;