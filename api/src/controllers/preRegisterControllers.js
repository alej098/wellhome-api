const PreMainPlace =  require('../modelsNoSql/PreMainPlace');
const logger = require ('../utils/logger');

const createRegister = async (
    name,
    country,
    state,
    city,
    district,
    placeDescription,
    phone,
    email,
    dni,
    foreName,
    lastName,
    ownerPhone,
    ownerEmail
) => {
    try {
        const newRegister = await PreMainPlace(
            {
                name,
                country,
                state,
                city,
                district,
                placeDescription,
                phone,
                email,
                dni,
                foreName,
                lastName,
                ownerPhone,
                ownerEmail
            }
        );
        await newRegister.save();
        logger.info('Nuevo Pre-Registro de condominio creado con éxito');
        return newRegister;
    } catch (error) {
        logger.error(`Error al llenar el Formulario de Pre-Registro de condominio desde el controlador: ${error.message}`);
        throw new Error('Error creando el formulario de Pre-Registro de condominio');
    }
};


const getRegister = async () =>{
    try {
        const allMainPlace = await PreMainPlace.find();
        return allMainPlace;
    } catch (error) {
        logger.error(`Error al traer a todos los Pre-Registros de condominios desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todos los Pre-Registros de condominios');
    }
};


const deleteRegister = async(preRegisterId) =>{
    try {
        const deletedRegister = await PreMainPlace.findByIdAndDelete (preRegisterId);
        logger.info('Pre-Registro de Condominio eliminado con éxito');
        return deletedRegister;
    } catch (error) {
        logger.error(`Error al eliminar un Pre-Registro de Condominio desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar un Pre-Registro de Condominio');
    }
};

module.exports={
    createRegister,
    getRegister,
    deleteRegister
}