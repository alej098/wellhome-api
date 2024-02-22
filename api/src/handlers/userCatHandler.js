const {handleSuccessResponse, handleErrorResponse} =require('../utils/utils');
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
    const {name, UserTypeId} = req.body;
    try {
        const newUserClass = await createClassUser(name, UserTypeId)
        handleSuccessResponse(res, newUserClass, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const createTypeUserHandler = async(req, res) => {
    const {name, UserClassId} = req.body;
    try {
        const newUserType = await createTypeUser(name, UserClassId)
        handleSuccessResponse(res, newUserType, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const updateClassUserHandler = async(req, res) => {
    const {classId} = req.params;
    const {
        name,
        isSuspended,
        UserTypeId
    } = req.body;
    try {
        const updateUserClass = await updateClassUser(
            classId,
            name, 
            isSuspended, 
            UserTypeId
            );
        handleSuccessResponse(res, updateUserClass);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const updateTypeUserHandler = async (req, res) => {
    const {typeId} = req.params;
    const {
        name,
        isSuspended,
        UserClassId
    } = req.body;
    try {
        const updateUserType = await updateTypeUser(
            typeId,
            name,
            isSuspended,
            UserClassId
        );
        handleSuccessResponse(res, updateUserType);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const deleteClassUserHandler = async (req, res) => {
    const {classId} = req.params;
    try {
        const deleteClass = await deleteClassUser(classId);
        handleSuccessResponse(res, deleteClass);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const deleteTypeUserHandler =  async(req, res) => {
    const {typeId} = req.params;
    try {
        const deleteType = await deleteTypeUser(typeId);
        handleSuccessResponse(res, deleteType);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getClassUserHandler = async(req, res) => {
    try {
        const classUser = await getClassUser()
        handleSuccessResponse(res, classUser);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getTypeUserHandler = async(req, res) => {
    try {
        const typeUser = await getTypeUser()
        handleSuccessResponse(res, typeUser);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getClassUserByIdHandler =  async(req, res) => {
    const{classId} = req.params;
    try {
        const classUserById = await getClassUserById(classId);
        handleSuccessResponse(res, classUserById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getTypeUserByIdHandler = async(req, res) => {
    const{typeId} = req.params;
    try {
        const typeUserById = await getTypeUserById(typeId);
        handleSuccessResponse(res, typeUserById);
    } catch (error) {
        handleErrorResponse(res, error);
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