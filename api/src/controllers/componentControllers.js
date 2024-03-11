const {ComponentClass, ComponentType, Component, MainPlace, Fee} = require ('../db');
const {checkExistence, getArrayByIds} = require('../utils/utils');
const logger = require('../utils/logger');

const createNewClass = async(name) => {
    try {
        const createClass = await ComponentClass.create(
            {name}
        );
        logger.info(`Se creó la Clase: ${name}`);
        return createClass;
    } catch (error) {
        const errorMessage =`Error en createNewClass Controller, no se pudo crear el ${name}: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};
 
const createNewType = async (name, ComponentClassId) => {
    try {
        const createType = await ComponentType.create(
            {name, ComponentClassId}
        );
        logger.info(`Se creó el Tipo: ${name}`);
        return createType;
    } catch (error) {
        const errorMessage =`Error en createNewType Controller, no se pudo crear el ${name}: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        logger.info(`El componente ${name}, se creó exitosamente.`);
        return createComponent;
    } catch (error) {
        const errorMessage =`Error en createNewComponent Controller, no se pudo crear el ${name}: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
   
};

const updateClassComponent = async(
    classComponentId,
    name,
    isSuspended
) => {
    try {
        const classComponent = await checkExistence(ComponentClass, classComponentId);
        await classComponent.update(
            {
                name,
                isSuspended
            },
            {where:{id: classComponentId}
            })

            logger.info(`Clase de Componente ${name} fue actualizada con éxito`);
            return classComponent;
            
    } catch (error) {
        const errorMessage =`Error en updateClassComponent Controller, no se pudo actualizar el ${name}: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const updateTypeComponent = async(
    typeComponentId,
    name,
    isSuspended,
    ComponentClassId
) => {
    try {
        const typeComponent = await checkExistence(ComponentType, typeComponentId);
        await typeComponent.update(
            {
                name,
                isSuspended,
                ComponentClassId
            },
            {where:{id: typeComponentId}}
        )

        logger.info(`Tipo de Componente ${name} fue actualizado con éxito`);
        return typeComponent;
        
    } catch (error) {
        const errorMessage =`Error en updateTypeComponent Controller, no se pudo actualizar el ${name}: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        const component = await checkExistence(Component, componentId);
        await component.update(
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
        logger.info(`El componente ${name} fue actualizado con éxito`);
        return component;
    } catch (error) {
        const errorMessage =`Error en updateTypeComponent Controller, no se pudo actualizar el ${name}: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteClassComponent = async(classComponentId) =>{
    try {
        const deletedClass = await checkExistence(ComponentClass, classComponentId)
        await deletedClass.destroy();
        logger.info('Clase de Componente eliminada con éxito.');
        return { message: "Clase de Componente eliminada exitosamente" };
    } catch (error) {
        const errorMessage =`Error en deleteClassComponent Controller, no se pudo eliminar el componente: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteTypeComponent = async (typeComponentId) => {
    try {
        const deletedType = await checkExistence(ComponentType, typeComponentId)
        await deletedType.destroy();
        logger.info('Tipo de Componente eliminado con éxito.');
        return { message: "Tipo de Componente eliminado exitosamente" };
    } catch (error) {
        const errorMessage =`Error en deleteTypeComponent Controller, no se pudo eliminar: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteComponent = async(componentId) => {
    try {
        const deletedComponent = await checkExistence(Component, componentId)
        await deletedComponent.destroy();
        logger.info('Componente eliminado con éxito.');
        return { message: "Componente eliminado exitosamente" };
    } catch (error) {
        const errorMessage =`Error en deleteComponent Controller, no se pudo eliminar el componente: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        const errorMessage =`Error en getAllClassComponent Controller: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        const errorMessage =`Error en getAllTypeComponent Controller: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        const errorMessage =`Error en getAllComponent Controller: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        if(!classComponentById) throw Error(`No se encontró la Clase de Componente con Id ${classComponentId}`);
        return classComponentById;
    } catch (error) {
        const errorMessage =`Error en getClassComponentById Controller: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        if(!typeComponentById) throw Error(`No se encontró el Tipo de Componente con Id ${typeComponentId}`);
        return typeComponentById;
    } catch (error) {
        const errorMessage =`Error en getTypeComponentById Controller: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
        if(!componentById) throw Error(`No se encontró el Componente con Id ${componentId}`);
        return componentById;
    } catch (error) {
        const errorMessage =`Error en getComponentById Controller: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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