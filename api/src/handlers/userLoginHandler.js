const { userLogin } = require("../controllers/userLoginControllers");

const userLoginHandler = async (req, res) => {
    const {login, password} = req.body;
    try {
        const {user, token} = await userLogin(login, password);
        res.status(200).json({
            dni: user.dni,
            foreName: user.foreName,
            lastName: user.lastName,
            phone: user.phone,
            status: user.status,
            isAdmin: user.isAdmin,
            acceptCost: user.acceptCost,
            token: token   
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {userLoginHandler};