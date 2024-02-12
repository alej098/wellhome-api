const {signUp} = require('../controllers/signUpControllers');

const singUpHandler = async (req, res) => {
    const {
        dni,
        foreName,
        lastName,
        phone,
        email,
        password,
        MainPlaceId
    } = req.body;
    try {
        const {newUserSignUp, token} = await signUp (
            dni,
            foreName,
            lastName,
            phone,
            email,
            password,
            MainPlaceId
        );
        res.status(201).json({newUserSignUp, token});
    } catch (error) {
        res.status(400).json({error: error.message});
        
    }
};

module.exports = {singUpHandler};
