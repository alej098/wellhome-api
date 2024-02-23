const {MainPlace} = require('../db');
const logger = require('../utils/logger');
const { checkExistence } = require('../utils/utils');

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
    try {
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
    } catch (error) {
        logger.error(`Error al crear un nuevo Condominio desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear un nuevo Condominio');
    }
};


const updateMainPlace =  async (
    mainPlaceId,
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
    try {
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
            {where: { id: mainPlaceId }}
        )
        if(!mainPlaceById) {
            throw Error ('No se encontraron Condominios')
        }   else{
            const updatedMainPlace = await MainPlace.findByPk(mainPlaceId)
            logger.error('Condominio actualizado con éxito.')
            return updatedMainPlace;
        } 
    } catch (error) {
        logger.error(`Error al actualizar el Condominio desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar el Condominio');
    }
    
};


const deleteMainPlace = async (mainPlaceId) => {
    try {
        const deletedMainPlace = await checkExistence(MainPlace, mainPlaceId)
        await User.destroy();
        logger.info ('Condominio eliminado con éxito')
        return { message: "Condominio eliminado exitosamente" };
    } catch (error) {
        logger.error(`Error al eliminar el Condominio desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar Condominio');
    }
   
};


const getAllMainPlace = async () =>{
    try {
        return await MainPlace.findAll({
            where:{
                isSuspended:false
            },
        });
    } catch (error) {
        logger.error(`Error al traer todos los Condominios desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los Condominios');
    }
    
};


const getMainPlaceById = async(mainPlaceId) =>{
    try {
        const place = await MainPlace.findOne({
            where: {id: mainPlaceId}
        });
        if (!place) throw Error("No existe el Condominio")
        return place;
    } catch (error) {
        logger.error(`Error al traer un Condomino por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer un Condominio por Id');
    }
};

module.exports ={
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceById
};