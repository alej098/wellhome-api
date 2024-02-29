const { User, UserType, Property, UserRol } = require('../db');
const securityUtils = require('../utils/security');
const {checkExistence, getArrayByIds} = require('../utils/utils');
const logger = require('../utils/logger');


const createNewUser = async (
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
) => {
    try {
        const arrayOfUserType = await getArrayByIds(UserType, UserTypeId);
        const arrayOfProperty = await getArrayByIds(Property, PropertyId);

        //Todos los usuarios por defecto se inicializan con Rol Usuario(residente), la modificación debe ser manual desde el dashboard
        const defaultUserRole = UserRolId ? undefined : await UserRol.findOne({
            where: { id: '03-User' },
        });

        const newUser = await User.create({
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
            UserRolId: UserRolId || (defaultUserRole ? defaultUserRole.id : undefined),
            UserTypeId,
            PropertyId
        });

        await newUser.setUserTypes(arrayOfUserType);
        await newUser.setProperties(arrayOfProperty);
        logger.info('Nuevo usuario creado con éxito.');

        return newUser;

    } catch (error) {
        logger.error(`Error al crear un nuevo usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear un nuevo usuario');
    }
};


const updateUser = async (
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
) => {
    try {

        logger.info('Actualizando un usuario...');
        const user = await checkExistence(User, userId)

        user.foreName = foreName;
        user.lastName = lastName;
        user.phone = phone;
        user.email = email;
        user.password = password;
        user.status = status;
        user.isAdmin = isAdmin;
        user.acceptCost = acceptCost;
        user.isSuspended = isSuspended;
        user.MainPlaceId = MainPlaceId;
        user.UserRolId = UserRolId;
        user.UserTypeId = UserTypeId;
        user.PropertyId = PropertyId;

        await user.save();

        const arrayOfUserType = await getArrayByIds(UserType, user.UserTypeId);
        const arrayOfProperty = await getArrayByIds(Property, user.PropertyId);

        await user.setUserTypes(arrayOfUserType);
        await user.setProperties(arrayOfProperty);

        logger.info('Usuario actualizado con éxito.');
        return user;

    } catch (error) {
        logger.error(`Error al actualizar un usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar usuario');
    }
    
};

const deleteUser = async (userId) => {
    try {
        logger.info('Eliminando un usuario...');

        const user = await checkExistence(User, userId)

        await user.destroy();
        logger.info('Usuario eliminado con éxito.');
        return { message: "Usuario eliminado exitosamente" };

    } catch (error) {
        logger.error(`Error al eliminar un usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar usuario');
    }
   
};

const getAllUsers = async () => {
    try {
        logger.info('Trayendo a todos los usuarios...');

        return await User.findAll({
            where : {isSuspended: false},
            include: [
                {
                    model: UserType,
                    attributes: ['name'],
                },
                // {
                //     model: Property,
                //     attributes: ['maingrouper', 'mainGrouperName', 'mainGrouperNumber'],
                // },
            ],
        });
    } catch (error) {
        logger.error(`Error al traer a todos los usuarios desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los usuarios');
    }
};

const getUserById = async (userId) => {
    try {
        logger.info('Trayendo a un usuario por Id...');
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: UserType,
                    attributes: ['name'],
                },
                {
                    model: Property,
                    attributes: ['mainGrouper', 'mainGrouperName', 'mainGrouperNumber'],
                },
            ],
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    } catch (error) {
        logger.error(`Error al traer a un usuario por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a un usuario por Id');
    }
};

const changePassword = async (login, currentPassword, newPassword) => {
    try {
        logger.info('Cambiando una contraseña...');
        const user = await User.findOne({
            where: { email: login }
        });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const validPassword = await securityUtils.comparePasswords(currentPassword, user.password)
        if (!validPassword) {
            throw new Error('Contraseña actual incorrecta');
        }

        user.password = newPassword;
        await user.save();
        
        return user;
    } catch (error) {
        logger.error(`Error cambiando la Contraseña desde el Controlador: ${error.message}`);
        throw new Error('Error interno al cambiar la contraseña');
    }
};

module.exports = {
    createNewUser,
    updateUser, 
    deleteUser,
    getAllUsers,
    getUserById,
    changePassword
};
