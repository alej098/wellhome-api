const {
    createNewUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    changePassword

} = require ("../controllers/userControllers.js");

const createUserHandler = async (req, res) => {
    const {
        dni,
        foreName,
        lastName,
        phone,
        email,
        password,
        status,
        isAdmin,
        acceptCost,
        isSuspended,
        MainPlaceId,
        UserRolId,
        userTypeId,
        propertyId
    } = req.body;
    
    try {
        const newUser = await createNewUser(
            dni,
            foreName,
            lastName,
            phone,
            email,
            password,
            status,
            isAdmin,
            acceptCost,
            isSuspended,
            MainPlaceId,
            UserRolId,
            userTypeId,
            propertyId
        );
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateUserHandler = async (req, res) => {
    const {idUser} = req.params;
    const {
        foreName,
        lastName,
        phone,
        email,
        password,
        status,
        isAdmin,
        acceptCost,
        isSuspended,
        MainPlaceId,
        UserRolId,
        userTypeId,
        propertyId
    } = req.body;
    console.log(foreName,
        lastName,
        phone,
        email,
        password,
        status,
        isAdmin,
        acceptCost,
        isSuspended,
        MainPlaceId,
        UserRolId,
        userTypeId,
        propertyId)
    try {
        const user =  await updateUser (
            idUser,
            foreName,
            lastName,
            phone,
            email,
            password,
            status,
            isAdmin,
            acceptCost,
            isSuspended,
            MainPlaceId,
            UserRolId,
            userTypeId,
            propertyId
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const deleteUserHandler = async (req, res) => {
    const {idUser} = req.params;
    try {
        const deleteUserById = await deleteUser(idUser);
        res.status(200).json(deleteUserById);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getUserHandler = async(req, res) => {
    try {
        const user =  await getAllUsers()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getUserByIdHandler = async (req, res) => {
    const {idUser} = req.params;
    try {
        const userById = await getUserById(idUser);
        res.status(200).json(userById);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const changePasswordHandler = async (req, res) => {
    const {
        login,
        currentPassword,
        newPassword
    }= req.body;
    try {
        const password = await changePassword (
            login,
            currentPassword,
            newPassword
        ); 
        res.status(200).json(password);
    } catch (error) {
        res.status(400).send({error: error.message});
        
    }
};

module.exports = {
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUserByIdHandler,
    changePasswordHandler
};