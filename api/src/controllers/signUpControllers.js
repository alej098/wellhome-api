const {User} = require("../db")

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
    return newUserSignUp;
};

module.exports={signUp};