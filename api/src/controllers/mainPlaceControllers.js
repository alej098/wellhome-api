const {MainPlace} = require('../db');

const createMainPlace = async (
    id,
    name,
    country,
    state,
    city,
    district,
    placeDescription,
    placeImage,
    phone,
    email,
    isSuspended,
    ManagementCoCompanyRUC
) => {
    const newMainPlace = await MainPlace.create(
        {
            id,
            name,
            country,
            state,
            city,
            district,
            placeDescription,
            placeImage,
            phone,
            email,
            isSuspended,
            ManagementCoCompanyRUC
        }
    )
    return newMainPlace;
};


const updateMainPlace =  async (
    idMainPlace,
    name,
    country,
    state,
    city,
    district,
    placeDescription,
    placeImage,
    phone,
    email,
    isSuspended,
    managementCoId
) => {
    const mainPlaceById = await MainPlace.update(
        {   name,
            country,
            state,
            city,
            district,
            placeDescription,
            placeImage,
            phone,
            email,
            isSuspended,
            managementCoId
        },
        {where: { id: idMainPlace }}
    )
    if(!mainPlaceById) {
        throw Error ('No se encontraron Condominios')
    }   else{
        const updatedMainPlace = await MainPlace.findByPk(idMainPlace)
        return updatedMainPlace;
    }
};


const deleteMainPlace = async (idMainPlace) => {
    const deletedMainPlace = await MainPlace.destroy({
        where: {id: idMainPlace},
    });
    if(!deletedMainPlace) { 
        throw new Error ("No existen Condominios con ese Id");
    }
    return "El condominio se eliminó exitosamente";
};


const getAllMainPlace = async () =>{
    return await MainPlace.findAll({
        where:{
            isSuspended:false
        },
    });
};


const getMainPlaceById = async(idMainPlace) =>{
    const place = await MainPlace.findOne({
        where: {id: idMainPlace}
    });
    if (!place) throw Error("No existe el Condominio")
    return place;
};

module.exports ={
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceById
};