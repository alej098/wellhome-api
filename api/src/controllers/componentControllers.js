const {ComponentClass, ComponentType, Component, MainPlace, Fee} = require ('../db');
const {checkExistence, getArrayByIds} = require('../utils/utils');
const logger = require('../utils/logger');

const createNewClass = async(name) => {
    try {
        const createClass = await ComponentClass.create(
            {name}
        );
        logger.info('Nueva Clase de Componente creada con éxito.');
        return createClass;
    } catch (error) {
        logger.error(`Error al crear una nueva Clase de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear una nueva Clase de Componente');
    }
};

const createNewType = async (name, ComponentClassId) => {
    try {
        const createType = await ComponentType.create(
            {name, ComponentClassId}
        );
        logger.info('Nuevo Tipo de Componente creado con éxito.');
        return createType;
    } catch (error) {
        logger.error(`Error al crear un nuevo Tipo de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear un nuevo Tipo de Componente');
    }
};

const createNewComponent = async(
    name,
    code,
    location,
    description,
    acceptCost,
    ComponentTypeId,
    MainPlaceId,
    FeedId,
) => {
    try {
        const createComponent = await Component.create(
            {
                name,
                code,
                location,
                description,
                acceptCost,
                ComponentTypeId,
                MainPlaceId,
                FeedId
            }
        );
        logger.info('Nuevo Componente creado con éxito.');
        return createComponent;
    } catch (error) {
        logger.error(`Error al crear un nuevo Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear un nuevo Componente');
    }
   
};

const updateClassComponent = async(
    classComponentId,
    name,
    isSuspended
) => {
    try {
        const classComponent = await ComponentClass.update(
            {
                name,
                isSuspended
            },
            {where:{id: classComponentId}}
        )
        if(!classComponent) {
            throw Error ('No se encontraron Clases de Componentes')
        }   else {
            const updatedClassComponent = await ComponentClass.findByPk(classComponentId);
            logger.info('Clase de Componente actualizada con éxito.');
            return updatedClassComponent;
        }
    } catch (error) {
        logger.error(`Error al actualizar una Clase de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar una Clase de Componente');
    }
};

const updateTypeComponent = async(
    typeComponentId,
    name,
    isSuspended,
    ComponentClassId
) => {
    try {
        const typeComponent = await ComponentType.update(
            {
                name,
                isSuspended,
                ComponentClassId
            },
            {where:{id: typeComponentId}}
        )
        if(!typeComponent) {
            throw Error ('No se encontraron tipos de componentes')
        }   else {
            const updatedTypeComponent = await ComponentType.findByPk(typeComponentId);
            logger.info('Tipo de Componente actualizado con éxito.');
            return updatedTypeComponent;
        } 
    } catch (error) {
        logger.error(`Error al actualizar un Tipo de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar un Tipo de Componente');
    }
};

const updateComponent = async (
    componentId,
    name,
    code,
    location,
    description,
    acceptCost,
    isSuspended,
    ComponentTypeId,
    MainPlaceId,
    FeedId
) => {
    try {
        const component = await Component.update(
            {
                name,
                code,
                location,
                description,
                acceptCost,
                isSuspended,
                ComponentTypeId,
                MainPlaceId,
                FeedId
            },
            {
                where:{id: componentId}
            }
        )
        if(!component) {
            throw Error ('No se encontró el componente')
        }   else {
            const updatedComponent = await Component.findByPk(componentId);
            logger.info('Componente actualizado con éxito.');
            return updatedComponent;
        }
    } catch (error) {
        logger.error(`Error al actualizar un Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar un Componente');
    }
};

const deleteClassComponent = async(classComponentId) =>{
    try {
        const deletedClass = await checkExistence(ComponentClass, classComponentId)
        await deletedClass.destroy();
        logger.info('Clase de Componente eliminada con éxito');
        return { message: "Clase de Componente eliminada exitosamente" };
    } catch (error) {
        logger.error(`Error al eliminar una Clase de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar una Clase de Componente');
    }
};

const deleteTypeComponent = async (typeComponentId) => {
    try {
        const deletedType = await checkExistence(ComponentType, typeComponentId)
        await deletedType.destroy();
        logger.info('Tipo de Componente eliminado con éxito.');
        return { message: "Tipo de Componente eliminado exitosamente" };
    } catch (error) {
        logger.error(`Error al eliminar un Tipo de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar un Tipo de Componente');
    }
};

const deleteComponent = async(componentId) => {
    try {
        const deletedComponent = await checkExistence(Component, componentId)
        await deletedComponent.destroy();
        logger.info('Componente eliminado con éxito.');
        return { message: "Componente eliminado exitosamente" };
    } catch (error) {
        logger.error(`Error al eliminar un Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar un Componente');
    }
};

const getAllClassComponent = async() => {
    try {
        return await ComponentClass.findAll({
            where:{
                isSuspended: false
            }
        });
    } catch (error) {
        logger.error(`Error al traer a todas las Clases de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todas las Clases de Componente');
    }
};

const getAllTypeComponent = async() => {
    try {
        return await ComponentType.findAll({
            where:{
                isSuspended: false
            },
            include: [{
                model: ComponentClass,
                attributes: ['name']
            }],
        });
    } catch (error) {
        logger.error(`Error al traer a todos los Tipos de Componente desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los Tipos de Componente');
    }
};

const getAllComponent = async() => {
    try {
        return await Component.findAll({
            where:{
                isSuspended: false
            },
            include: [{
                model: ComponentType,
                attributes: ['name']
            }],
            include: [{
                model: MainPlace,
                attributes: ['name']
            }],
            include: [{
                model: Fee,
                attributes: ['feeDescription']
            }],
        });
    } catch (error) {
        logger.error(`Error al traer a todos los Componentes desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los Componentes');
    }
};

const getClassComponentById = async (classComponentId) => {
    try {
        const classComponentById = await ComponentClass.findOne({
            where: {
                id: classComponentId,
                isSuspended: false
            }
        });
        if(!classComponentById) throw Error('No existen Clases con ese Id');
        return classComponentById;
    } catch (error) {
        logger.error(`Error al traer una Clase de Componente por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer una Clase de Componente por Id');
    }
};

const getTypeComponentById = async (typeComponentId) => {
    try {
        const typeComponentById = await ComponentType.findOne({
            where: {
                id: typeComponentId,
                isSuspended: false
            }
        });
        if(!typeComponentById) throw Error('No existen Tipos con ese Id');
        return typeComponentById;
    } catch (error) {
        logger.error(`Error al traer un Tipo de Componente por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer un Tipo de Componente por Id');
    }
};

const getComponentById = async(componentId) => {
    try {
        const componentById = await Component.findOne({
            where: {
                id: componentId,
                isSuspended: false
            }
        });
        if(!componentById) throw Error('No existen componentes con ese Id');
        return componentById;
    } catch (error) {
        logger.error(`Error al traer un Componente por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer un Componente por Id');
    }
    
};

module.exports = {
    createNewClass,
    createNewType, 
    createNewComponent,

    updateClassComponent,
    updateTypeComponent,
    updateComponent,

    deleteClassComponent,
    deleteTypeComponent,
    deleteComponent,

    getAllClassComponent,
    getAllTypeComponent,
    getAllComponent,

    getClassComponentById,
    getTypeComponentById,
    getComponentById
};