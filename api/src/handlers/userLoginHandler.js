const { userLogin } = require("../controllers/userLoginControllers");

const userLoginHandler = async (req, res) => {
    const {login, password} = req.body;
    try {
        const {user, token} = await userLogin(login, password);
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {userLoginHandler};