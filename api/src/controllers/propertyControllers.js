const {Property, MainPlace, User} = require ('../db');

const createProperty = async(
    propertyType,
    mainGrouper,
    mainGrouperName,
    mainGrouperNumber,
    secondaryGrouper,
    status,
    subStatus,
    isSuspended,
    MainPlaceId,
    userDni
) => {

    let arrayOfUserDni = [];
    for (const dni of userDni) {
        let addUserDni = await User.findByPk(dni);
        arrayOfUserDni.push(addUserDni);
    }
    
    const newProperty = await Property.create(
        {
            propertyType,
            mainGrouper,
            mainGrouperName,
            mainGrouperNumber,
            secondaryGrouper,
            status,
            subStatus,
            isSuspended,
            MainPlaceId,
            userDni
        }
    )
    await createProperty.setUsers(arrayOfUserDni);
    return newProperty;
};

const updateProperty = async (
    propertyId,
    propertyType,
    mainGrouper,
    mainGrouperName,
    mainGrouperNumber,
    secondaryGrouper,
    status,
    subStatus,
    isSuspended,
    MainPlaceId,
    userDni
) => {
    const [numUpdated] = await Property.update(
        {
            propertyType,
            mainGrouper,
            mainGrouperName,
            mainGrouperNumber,
            secondaryGrouper,
            status,
            subStatus,
            isSuspended,
            MainPlaceId,
            userDni
        },
        {where: {id: propertyId}}
    );
    if (!numUpdated) {
        throw Error ('No se encontró la Propiedad requerida');
    }

    const updatedProperty = await Property.findByPk(propertyId);
    await updatedProperty.setUsers([]);
    if (userDni && userDni.length > 0) {
        let arrayOfUserDni = [];
        for (const dni of userDni) {
            let addUserDni = await User.findByPk(dni);
            if (addUserDni) {
                arrayOfUserDni.push(addUserDni);
            }
        }
        await updatedProperty.setUsers(arrayOfUserDni);
    }
    return updatedProperty;
};

const deleteProperty = async (propertyId) => {
    const deletedProperty = await Property.destroy({
        where: {id: propertyId}
    });
    if(!deletedProperty){
        throw new Error('No se encontraron Propiedades con ese Id');
    }
    return 'La propiedad ha sido eliminada';
};

const getProperty = async () => {
    return await Property.findAll({
        where: {isSuspended: false},
        include:[{
            model: MainPlace,
            attributes: ['name']
        }],
    });
};

const getPropertyById = async (propertyId) => {
    const propertyById = await Property.findOne({
        where: {
            id: propertyId,
            isSuspended: false
        }
    });
    if(!propertyById) throw Error('No existen propiedades con ese Id');
    return propertyById;
};

module.exports ={ 
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    getPropertyById
};