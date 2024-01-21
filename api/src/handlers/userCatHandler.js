const {
    createClassUser,
    createTypeUser,
    updateClassUser,
    updateTypeUser,
    deleteClassUser,
    deleteTypeUser,
    getClassUser,
    getTypeUser,
    getClassUserById,
    getTypeUserById

} =  require('../controllers/userCatControllers');

const createClassUserHandler = async(req, res) => {
    const {name, userTypeId} = req.body;
    try {
        const newUserClass = await createClassUser(name, userTypeId)
        res.status(201).json(newUserClass);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const createTypeUserHandler = async(req, res) => {
    const {name, userClassId} = req.body;
    try {
        const newUserType = await createTypeUser(name, userClassId)
        res.status(201).json(newUserType);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateClassUserHandler = async(req, res) => {
    const {idClassUser} = req.params;
    const {
        name,
        isSuspended,
        userTypeId
    } = req.body;
    try {
        const updateUserClass = await updateClassUser(
            idClassUser,
            name, 
            isSuspended, 
            userTypeId
            );
        res.status(200).json(updateUserClass);
    } catch (error) {
        res.status(400).send({error: error.message});      
    }
};

const updateTypeUserHandler = async (req, res) => {
    const {idTypeUser} = req.params;
    const {
        name,
        isSuspended,
        userClassId
    } = req.body;
    try {
        const updateUserType = await updateTypeUser(
            idTypeUser,
            name,
            isSuspended,
            userClassId
        );
        res.status(200).json(updateUserType);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const deleteClassUserHandler = async (req, res) => {
    const {idClassUser} = req.params;
    try {
        const deleteClass = await deleteClassUser(idClassUser);
        res.status(200).json(deleteClass);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const deleteTypeUserHandler =  async(req, res) => {
    const {idTypeUser} = req.params;
    try {
        const deleteType = await deleteTypeUser(idTypeUser);
        res.status(200).json(deleteType);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getClassUserHandler = async(req, res) => {
    try {
        const classUser = await getClassUser()
        res.status(200).json(classUser);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getTypeUserHandler = async(req, res) => {
    try {
        const typeUser = await getTypeUser()
        res.status(200).json(typeUser);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getClassUserByIdHandler =  async(req, res) => {
    const{idClassUser} = req.params;
    try {
        const classUserById = await getClassUserById(idClassUser);
        res.status(200).json(classUserById);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getTypeUserByIdHandler = async(req, res) => {
    const{idTypeUser} = req.params;
    try {
        const typeUserById = await getTypeUserById(idTypeUser);
        res.status(200).json(typeUserById);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};


module.exports = {
    createClassUserHandler,
    createTypeUserHandler,
    updateClassUserHandler,
    updateTypeUserHandler,
    deleteClassUserHandler,
    deleteTypeUserHandler,
    getClassUserHandler,
    getTypeUserHandler,
    getClassUserByIdHandler,
    getTypeUserByIdHandler
};