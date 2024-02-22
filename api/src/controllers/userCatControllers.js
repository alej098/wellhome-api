const {UserClass, UserType} = require('../db');
const {getArrayByIds, checkExistence} =require('../utils/utils');
const logger = require('../utils/logger');

const createClassUser = async(name, UserTypeId) =>{
    try {
        
        const arrayOfUserType = await getArrayByIds(UserType, UserTypeId);

        const createClass = await UserClass.create(
            {name, UserTypeId}
        )
        await createClass.setUserTypes(arrayOfUserType);
        logger.info('Nueva Clase de usuario creada con éxito')
        return createClass;

    } catch (error) {
        logger.error(`Error al crear una clase de usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear una clase de usuario');
    }
    
};

const createTypeUser = async(name, UserClassId) =>{
    try {

        const arrayOfUserClass = await getArrayByIds(UserClass, UserClassId);

        const createType = await UserType.create(
            {name, UserClassId}
        )
        await createType.setUserClasses(arrayOfUserClass);
        logger.info('Nuevo Tipo de usuario creado con éxito')
        return createType;

    } catch (error) {
        logger.error(`Error al crear un tipo de usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear un tipo de usuario');
    }
    
};

const updateClassUser = async (
    classId, 
    name, 
    isSuspended, 
    UserTypeId
) => {
    try {
        const userClass = await checkExistence(UserClass, classId)
        userClass.name = name;
        userClass.isSuspended = isSuspended;
        userClass.UserTypeId = UserTypeId;

        await userClass.save();

        const arrayOfUserType = await getArrayByIds(UserType, UserTypeId);
        await userClass.setUserTypes(arrayOfUserType);

        logger.info('Clase de usuario actualizada con éxito');
        return userClass;

    } catch (error) {
        logger.error(`Error al actualizar la clase de usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar la clase de usuario');
    }
};

const updateTypeUser = async(
    typeId, 
    name, 
    isSuspended, 
    UserClassId
) => {
    try {
        const userType = await checkExistence(UserType, typeId)
        userType.name = name;
        userType.isSuspended = isSuspended;
        userType.UserClassId = UserClassId;

        await userType.save();

        const arrayOfUserClass = await getArrayByIds(UserClass, UserClassId);
        await userType.setUserClasses(arrayOfUserClass);

        logger.info('Tipo de usuario actualizada con éxito');
        return userType;

    } catch (error) {
        logger.error(`Error al actualizar el Tipo de usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar el Tipo de usuario');
    }
        
};

const deleteClassUser = async(classId) => {
    try {
        const deletedClass = await checkExistence(UserClass, classId)

        await deletedClass.destroy();
        logger.info('Clase de usuario eliminada con éxito');
        return {message: "Clase de Usuario eiminada exitosamente"};

    } catch (error) {
        logger.error(`Error al eliminar una Clase de usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar una Clase de usuario');
    }
};

const deleteTypeUser =  async(typeId) => {
    try {
        const deletedType = await checkExistence(UserType, typeId)

        await deletedType.destroy();
        logger.info('Tipo de usuario eliminado con éxito');
        return {message: "Tipo de Usuario eiminado exitosamente"};

    } catch (error) {
        logger.error(`Error al eliminar un Tipo de usuario desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar un Tipo de usuario');
    }
    
};

const getClassUser = async() => {
    try {
        return await UserClass.findAll({
            where: {isSuspended: false},
            include: [{
                model: UserType,
                attributes: ['name']
            }],
        });
    } catch (error) {
        logger.error(`Error al traer a todas las Clases de usuarios desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todas las Clases de usuarios');
    }
    
};

const getTypeUser = async() => {
    try {
        return await UserType.findAll({
            where: {isSuspended: false},
            include: [{model: UserClass,
            attributes: ['name']}]
        });
    } catch (error) {
        logger.error(`Error al traer a todos los tipos de usuarios desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los tipos de usuarios');
    }
    
};

const getClassUserById = async(classId) => {
    try {
        const classUserById = await UserClass.findOne({
            where: {
                id: classId,
                isSuspended: false
            },
            include: [{
                model: UserType,
                attributes: ['id', 'name'],
                through: {
                    attributes: [],
                }
            }]
        });
        if(!classUserById) throw Error('No existen Clases con ese Id');
        return classUserById;
    } catch (error) {
        logger.error(`Error al traer a una Clase de usuario por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a una Clase de usuario por Id');
    }
    
};

const getTypeUserById = async(typeId) =>{
    try {
        const typeUserById = await UserType.findOne({
            where: {
                id: typeId,
                isSuspended: false
            },
            include: [{
                model: UserClass,
                attributes: ['id', 'name'],
                through: {
                    attributes:[]
                }
            }]
        });
        if(!typeUserById) throw Error('No existen Tipos con ese Id');
        return typeUserById;
    } catch (error) {
        logger.error(`Error al traer a un Tipo de usuario por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a un Tipo de usuario por Id');
    }
    
}

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