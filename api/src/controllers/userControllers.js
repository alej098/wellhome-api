const { User, UserType, UserClass, Property, UserRol } = require('../db');
const securityUtils = require('../utils/security');
const {checkExistence, getArrayByIds} = require('../utils/utils');
const { Op } = require('sequelize');
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
    UserClassId,
    UserTypeId,
    PropertyId
) => {
    try {
        const arrayOfUserClass = await getArrayByIds(UserClass, UserClassId);
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
            UserClassId,
            UserTypeId,
            PropertyId
        });
        await newUser.setUserClasses(arrayOfUserClass);
        await newUser.setUserTypes(arrayOfUserType);
        await newUser.setProperties(arrayOfProperty);
        logger.info('Nuevo usuario creado con éxito.');

        return newUser;

    } catch (error) {
        const errorMessage = `Error en createNewUser Controller, no se pudo crear el usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
    UserClassId,
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
        user.UserClassId = UserClassId;
        user.UserTypeId = UserTypeId;
        user.PropertyId = PropertyId;

        await user.save();

        const arrayOfUserClass = await getArrayByIds(UserClass, user.UserClassId);
        const arrayOfUserType = await getArrayByIds(UserType, user.UserTypeId);
        const arrayOfProperty = await getArrayByIds(Property, user.PropertyId);

        await user.setUserClasses(arrayOfUserClass);
        await user.setUserTypes(arrayOfUserType);
        await user.setProperties(arrayOfProperty);

        logger.info('Usuario actualizado con éxito.');
        return user;

    } catch (error) {
        const errorMessage = `Error en updateUser Controller, no se pudo actualizar el usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        const errorMessage = `Error en deleteUser Controller, no se pudo eliminar el usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getAllUsers = async () => {
    try {
        logger.info('Trayendo a todos los usuarios...');

        return await User.findAll();
    } catch (error) {
        const errorMessage = `Error en getAllUsers  Controller, no se pudo traer a todos los usuarios ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getAllUsersNoSuspended = async () => {
    try {
        logger.info('Trayendo a todos los usuarios Activos...');

        return await User.findAll({
            where : {isSuspended: false},
            include: [
                {
                    model: UserClass,
                    attributes: ['name'],
                },
                {
                    model: UserType,
                    attributes: ['name'],
                },
            ],
        });
    } catch (error) {
        const errorMessage = `Error en getAllUsersNoSuspended Controller, no se pudo traer los usuarios no suspendidos ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getUserByForeName = async (foreName) => {
    try {
      const usersByName = await User.findAll({
        where: {
          foreName: {
            [Op.iLike]: `%${foreName}%`,
          },
        },
      });
      if (usersByName.length === 0) {
        throw new Error("No se encontraron usuarios con ese nombre");
    }
      return usersByName;
    } catch (error) {
        const errorMessage = `Error en getUserByForeName Controller, no se pudo traer el usuario por el nombre ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getUserByLastName = async (lastName) => {
try {
    const usersByLastName = await User.findAll({
    where: {
        lastName: {
        [Op.iLike]: `%${lastName}%`,
        },
    },
    });
    if (usersByLastName.length === 0) {
        throw new Error("No se encontraron usuarios con ese apellido");
    }
    return usersByLastName;
} catch (error) {
    const errorMessage = `Error en getUserByLastName Controller, no se pudo traer el usuario por el apellido ${error.message}`;
    logger.error(errorMessage);
    if (error.stack) {
        logger.error(error.stack);
    }
    throw new Error(errorMessage);
}
};



const getUserById = async (userId) => {
    try {
        logger.info('Trayendo a un usuario por Id...');
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: UserClass,
                    attributes: ['name'],
                },
                {
                    model: UserType,
                    attributes: ['name'],
                },
                {
                    model: Property,
                    attributes: ['mainGrouper', 'mainGrouperName', 'mainGrouperNumber'],
                },
            ]
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    } catch (error) {
        const errorMessage = `Error en getUserById Controller, no se pudo traer el usuario por el id ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        const errorMessage = `Error en changePassword  Controller, no se pudo cambiar la contraseña ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
    };

module.exports = {
    createNewUser,
    updateUser, 
    deleteUser,
    getAllUsers,
    getAllUsersNoSuspended,
    getUserByForeName,
    getUserByLastName,
    getUserById,
    changePassword
};
