const PreMainPlace =  require('../modelsNoSql/PreMainPlace');
const logger = require ('../utils/logger');

const createMainPlaceRegister = async (
    name,
    country,
    state,
    city,
    district,
    placeDescription,
    phone,
    email
) => {
    try {
        const newMainPlaceRegister = await PreMainPlace(
            {
                name,
                country,
                state,
                city,
                district,
                placeDescription,
                phone,
                email
            }
        );
        await newMainPlaceRegister.save();
        logger.info('Nuevo Pre-Registro de condominio creado con éxito');
        return newMainPlaceRegister;
    } catch (error) {
        logger.error(`Error al llenar el Formulario de Pre-Registro de condominio desde el controlador: ${error.message}`);
        throw new Error('Error creando el formulario de Pre-Registro de condominio');
    }
};


const getMainPlaceRegister = async () =>{
    try {
        const allMainPlace = await PreMainPlace.find();
        return allMainPlace;
    } catch (error) {
        logger.error(`Error al traer a todos los Pre-Registros de condominios desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los Pre-Registros de condominios');
    }
};


const deleteMainPlaceRegister = async(mainPlaceFormId) =>{
    try {
        const deletedMainPlaceRegister = await PreMainPlace.findByIdAndDelete (mainPlaceFormId);
        logger.info('Pre-Registro de Condominio eliminado con éxito');
        return deletedMainPlaceRegister;
    } catch (error) {
        logger.error(`Error al eliminar un Pre-Registro de Condominio desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar un Pre-Registro de Condominio');
    }
};

module.exports={
    createMainPlaceRegister,
    getMainPlaceRegister,
    deleteMainPlaceRegister
}