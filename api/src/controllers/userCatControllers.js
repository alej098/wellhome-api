const {UserClass, UserType} = require('../db');
const {getArrayByIds, checkExistence} =require('../utils/utils');
const logger = require('../utils/logger');

const createClassUser = async(name) =>{
    try {

        const createClass = await UserClass.create({name})
        logger.info('Nueva Clase de usuario creada con éxito')
        return createClass;

    } catch (error) {
        const errorMessage = `Error en createContactForm Controller, no se pudo crear la clase de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const createTypeUser = async(name, UserClassId) =>{
    try {

        const arrayOfUserClass = await getArrayByIds(UserClass, UserClassId);

        const createType = await UserType.create({name})
        logger.info('Nuevo Tipo de usuario creado con éxito')
        return createType;

    } catch (error) {
        const errorMessage = `Error en createTypeUser Controller, no se pudo crear un tipo de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const updateClassUser = async (
    classId, 
    name, 
    isSuspended
) => {
    try {
        const userClass = await checkExistence(UserClass, classId)
        userClass.name = name;
        userClass.isSuspended = isSuspended;

        await userClass.save();

        logger.info('Clase de usuario actualizada con éxito');
        return userClass;

    } catch (error) {
        const errorMessage = `Error en updateClassUser Controller, no se pudo actualizar la clase de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const updateTypeUser = async(
    typeId, 
    name, 
    isSuspended
) => {
    try {
        const userType = await checkExistence(UserType, typeId)
        userType.name = name;
        userType.isSuspended = isSuspended;

        await userType.save();

        logger.info('Tipo de usuario actualizada con éxito');
        return userType;

    } catch (error) {
        const errorMessage = `Error en updateTypeUser Controller, no se pudo actualizar el tipo de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteClassUser = async(classId) => {
    try {
        const deletedClass = await checkExistence(UserClass, classId)

        await deletedClass.destroy();
        logger.info('Clase de usuario eliminada con éxito');
        return {message: "Clase de Usuario eiminada exitosamente"};

    } catch (error) {
        const errorMessage = `Error en deleteClassUser Controller, no se pudo eliminar la clase de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteTypeUser =  async(typeId) => {
    try {
        const deletedType = await checkExistence(UserType, typeId)

        await deletedType.destroy();
        logger.info('Tipo de usuario eliminado con éxito');
        return {message: "Tipo de Usuario eiminado exitosamente"};

    } catch (error) {
        const errorMessage = `Error en deleteTypeUser Controller, no se pudo eliminar el tipo de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getClassUser = async() => {
    try {
        return await UserClass.findAll({
            where: {isSuspended: false}
        });
    } catch (error) {
        const errorMessage = `Error en getClassUser Controller, no se pudo traer a todos las clases de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getTypeUser = async() => {
    try {
        return await UserType.findAll({
            where: {isSuspended: false,}
        });
    } catch (error) {
        const errorMessage = `Error en getTypeUser Controller, no se pudo traer a todos los tipos de usuario ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getClassUserById = async(classId) => {
    try {
        const classUserById = await UserClass.findOne({
            where: {
                id: classId,
                isSuspended: false
            }
        });
        if(!classUserById) throw Error('No existen Clases con ese Id');
        return classUserById;
    } catch (error) {
        const errorMessage = `Error en getClassUserById Controller, no se pudo traer la clase por id ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getTypeUserById = async(typeId) =>{
    try {
        const typeUserById = await UserType.findOne({
            where: {
                id: typeId,
                isSuspended: false
            }
        });
        if(!typeUserById) throw Error('No existen Tipos con ese Id');
        return typeUserById;
    } catch (error) {
        const errorMessage = `Error en etTypeUserById Controller, no se pudo traer los tipos por id ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports = {
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
};