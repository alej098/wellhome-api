const {User, MainPlace} = require("../db")
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const signUp = async(
    dni,
    foreName,
    lastName,
    phone,
    email,
    password,
    MainPlaceId
) => {
    const newSignUp = {
        dni,
        foreName,
        lastName,
        phone,
        email,
        password,
        MainPlaceId
    };

    const newUserSignUp = await User.create(newSignUp);
    const token = jwt.sign({dni: newUserSignUp.dni}, JWT_SECRET, {expiresIn: "1d"})
    return {newUserSignUp, token};
};

module.exports={signUp};