const {ComponentClass, ComponentType, Component, MainPlace} = require ('../db');

const createNewClass = async(name) => {
    const createClass = await ComponentClass.create(
        {name}
    )
    return createClass;
};


const createNewType = async (name, ComponentClassId) => {
    const createType = await ComponentType.create(
        {name, ComponentClassId}
    )
    return createType;
};


const createNewComponent = async(
    name,
    code,
    location,
    description,
    ComponentTypeId,
    MainPlaceId
) => {
    const createComponent = await Component.create(
        {
            name,
            code,
            location,
            description,
            ComponentTypeId,
            MainPlaceId
        }
    )
    return createComponent;
};


const updateClassComponent = async(
    idClassComponent,
    name,
    isSuspended
) => {
    const classComponent = await ComponentClass.update(
        {
            name,
            isSuspended
        },
        {where:{id: idClassComponent}}
    )
    if(!classComponent) {
        throw Error ('No se encontraron Clases de Componentes')
    }   else {
        const updatedClassComponent = await ComponentClass.findByPk(idClassComponent)
        return updatedClassComponent;
    }
};


const updateTypeComponent = async(
    idTypeComponent,
    name,
    isSuspended,
    ComponentClassId
) => {
    const typeComponent = await ComponentType.update(
        {
            name,
            isSuspended,
            ComponentClassId
        },
        {where:{id: idTypeComponent}}
    )
    if(!typeComponent) {
        throw Error ('No se encontraron tipos de componentes')
    }   else {
        const updatedTypeComponent = await ComponentType.findByPk(idTypeComponent)
        return updatedTypeComponent;
    }
};


const updateComponent = async (
    idComponent,
    name,
    code,
    location,
    description,
    isSuspended,
    ComponentTypeId,
    MainPlaceId
) => {
    const component = await Component.update(
        {
            name,
            code,
            location,
            description,
            isSuspended,
            ComponentTypeId,
            MainPlaceId
        },
        {
            where:{id: idComponent}
        }
    )
    if(!component) {
        throw Error ('No se encontró el componente')
    }   else {
        const updatedComponent = await Component.findByPk(idComponent)
        return updatedComponent;
    }
};


const deleteClassComponent = async(idClassComponent) =>{
    const deletedClass = await ComponentClass.destroy({
        where: {id: idClassComponent}
    });
    if (!deletedClass) {
        throw new Error('No existen Clases con ese Id');
    }
    return 'La clase ha sido eliminada';
};


const deleteTypeComponent = async (idTypeComponent) => {
    const deletedType = await ComponentType.destroy({
        where: {id: idTypeComponent}
    });
    if (!deletedType) {
        throw new Error('No existen Tipos con ese Id');
    }
    return 'El Tipo fue eliminado';
};


const deleteComponent = async(idComponent) => {
    const deletedComponent = await Component.destroy({
        where: {id: idComponent}
    });
    if(!deletedComponent) {
        throw new Error('No existen componentes con ese Id');
    }
    return 'El componente fue eliminado'
};


const getAllClassComponent = async() => {
    return await ComponentClass.findAll({
        where:{
            isSuspended: false
        }
    });
};


const getAllTypeComponent = async() => {
    return await ComponentType.findAll({
        where:{
            isSuspended: false
        },
        include: [{
            model: ComponentClass,
            attributes: ['name']
        }],
    });
};


const getAllComponent = async() => {
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
    });
};


const getClassComponentById = async (idClassComponent) => {
    const classComponentById = await ComponentClass.findOne({
        where: {
            id: idClassComponent,
            isSuspended: false
        }
    });
    if(!classComponentById) throw Error('No existen Clases con ese Id');
    return classComponentById;
};


const getTypeComponentById = async (idTypeComponent) => {
    const typeComponentById = await ComponentType.findOne({
        where: {
            id: idTypeComponent,
            isSuspended: false
        }
    });
    if(!typeComponentById) throw Error('No existen Tipos con ese Id');
    return typeComponentById;
};


const getComponentById = async(idComponent) => {
    const componentById = await Component.findOne({
        where: {
            id: idComponent,
            isSuspended: false
        }
    });
    if(!componentById) throw Error('No existen componentes con ese Id');
    return componentById;
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