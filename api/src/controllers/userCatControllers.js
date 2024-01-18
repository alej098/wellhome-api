const {UserClass, UserType} = require('../db');

const createClassUser = async(name, userTypeId) =>{

    let arrayOfType = [];
    for (const id of userTypeId) {
        let addType = await UserType.findByPk(id);
        arrayOfType.push(addType);
    }
    const createClass = await UserClass.create(
        {name, userTypeId}
    )
    await createClass.setUserTypes(arrayOfType);
    return createClass;
};


const createTypeUser = async(name, userClassId) =>{

    let arrayOfClass = [];
    for (const id of userClassId) {
        let addClass = await UserClass.findByPk(id);
        arrayOfClass.push(addClass);
    }
    const createType = await UserType.create(
        {name, userClassId}
    )
    await createType.setUserClasses(arrayOfClass);
    return createType;
};


const updateClassUser = async (idClassUser, name, isSuspended, userTypeId) => {
    const [numUpdated] = await UserClass.update(
        {
            name,
            isSuspended,
            userTypeId,
        },
        { where: { id: idClassUser } }
    );

    if (numUpdated === 0) {
        throw Error('No se encontró la Clase requerida');
    }

    // Obtener la instancia actualizada
    const updatedClassUser = await UserClass.findByPk(idClassUser);

    await updatedClassUser.setUserTypes([]);

    if (userTypeId && userTypeId.length > 0) {
        let arrayOfType = [];
        for (const id of userTypeId) {
            let addType = await UserType.findByPk(id);
            if (addType) {
                arrayOfType.push(addType);
            }
        }
        await updatedClassUser.setUserTypes(arrayOfType);
    }

    return updatedClassUser;
};


const updateTypeUser = async(idTypeUser, name, isSuspended, userClassId) => {
        const [numUpdated] = await UserType.update(
            {
            name, 
            isSuspended, 
            userClassId
            },
            {where: {id: idTypeUser}}
        );

        if(numUpdated ===0) {
            throw Error ('No se econtró el Tipo con este Id')
        }   
        
        const updatedTypeUser = await UserType.findByPk(idTypeUser);

        await updatedTypeUser.setUserClasses([]);

        if (userClassId && userClassId.length > 0) {
            let arrayOfClass = [];
            for (const id of userClassId) {
                let addClass = await UserClass.findByPk(id);
                if (addType) {
                    arrayOfClass.push(addClass);
                }
            } 
            await updatedTypeUser.setUserClasses(arrayOfClass);
        }
        return updatedTypeUser;
    };

    
const deleteClassUser = async(idClassUser) => {
    const deletedClass = await UserClass.destroy({
        where: {id: idClassUser}
    });
    if(!deletedClass){
        throw new Error('No se encontraron Clases con ese Id');
    }
    return 'La Clase ha sido eliminada';
};


const deleteTypeUser =  async(idTypeUser) => {
    const deletedType = await UserType.destroy({
        where: {id: idTypeUser}
    });
    if(!deletedType){
        throw new Error('No se encontraron Tipos con ese Id');
    }
    return 'El tipo ha sido eliminado';
};


const getClassUser = async() => {
    return await UserClass.findAll({
        where: {isSuspended: false},
        include: [{
            model: UserType,
            attributes: ['name']
        }],
    });
};


const getTypeUser = async() => {
    return await UserType.findAll({
        where: {isSuspended: false},
        include: [{model: UserClass,
        attributes: ['name']}]
    });
};


const getClassUserById = async(idClassUser) => {
    const classUserById = await UserClass.findOne({
        where: {
            id: idClassUser,
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
};


const getTypeUserById = async(idTypeUser) =>{
    const typeUserById = await UserType.findOne({
        where: {
            id: idTypeUser,
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