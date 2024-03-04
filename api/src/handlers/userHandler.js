const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {
    createNewUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getAllUsersNoSuspended,
    getUserByForeName,
    getUserByLastName,
    getUserById,
    changePassword

} = require ('../controllers/userControllers.js');

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
        UserTypeId, //Debe llegar como un array siempre
        PropertyId  //Debe llegar como un array siempre
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
            UserTypeId,
            PropertyId
        );
        logger.info('Creación Exitosa de Usuario');
        handleSuccessResponse(res, newUser, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const updateUserHandler = async (req, res) => {
    const {userId} = req.params;
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
        UserTypeId,
        PropertyId
    } = req.body;
    try {
        const user =  await updateUser (
            userId,
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
            UserTypeId,
            PropertyId
        );
        logger.info('Actualización Exitosa de Usuario');
        handleSuccessResponse(res, user);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const deleteUserHandler = async (req, res) => {
    const {userId} = req.params;
    try {
        const deleteUserById = await deleteUser(userId);
        logger.info('Se eliminó exitosamente al Usuario');
        handleSuccessResponse(res, deleteUserById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getUserHandler = async(req, res) => {
    try {
        const user =  await getAllUsers();
        logger.info('Se trajeron a todos los usuarios');
        handleSuccessResponse(res, user);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getUserNoSuspendedHandler = async(req, res) => {
    try {
        const user =  await getAllUsersNoSuspended();
        logger.info('Se trajeron a todos los usuarios');
        handleSuccessResponse(res, user);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getUserByForeNameHandler = async (req, res) => {
    const { foreName } = req.params;
    try {
      const usersByForeName = await getUserByForeName(foreName);
      logger.info('Se trajeron exitosamente los usuarios por nombre');
      handleSuccessResponse(res, usersByForeName)
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };
  

  const getUserByLastNameHandler = async (req, res) => {
    const { lastName } = req.params;
    try {
      const usersByLastName = await getUserByLastName(lastName);
      logger.info('Se trajeron exitosamente los usuarios por apellido');
      handleSuccessResponse(res, usersByLastName)
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };


const getUserByIdHandler = async (req, res) => {
    const {userId} = req.params;
    try {
        const userById = await getUserById(userId);
        logger.info('Se trajo exitosamente al Usuario');
        handleSuccessResponse(res, userById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const changePasswordHandler = async (req, res) => {
    const {
        login,
        currentPassword,
        newPassword
    }= req.body;
    try {
            await changePassword(
            login,
            currentPassword,
            newPassword
        ); 
        logger.info('Se cambió la contraseña');
        handleSuccessResponse(res, { message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports = {
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUserNoSuspendedHandler,
    getUserByForeNameHandler,
    getUserByLastNameHandler,
    getUserByIdHandler,
    changePasswordHandler
};