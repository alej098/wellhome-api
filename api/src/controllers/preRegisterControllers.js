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
    // email,
    foreName,
    lastName,
    dni,
    ownerPhone,
    ownerEmail,
    password,
    repeat_password,
    checkbox_confirm
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
                // email,
                foreName,
                lastName,
                dni,
                ownerPhone,
                ownerEmail,
                password,
                repeat_password,
                checkbox_confirm
            }
        );
        await newRegister.save();
        logger.info('Nuevo Pre-Registro de condominio creado con éxito');
        return newRegister;
    } catch (error) {
        const errorMessage = `Error en createRegister Controller, no se pudo crear el pre Registro ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getRegister = async () =>{
    try {
        const allMainPlace = await PreMainPlace.find();
        return allMainPlace;
    } catch (error) {
        const errorMessage = `Error en getRegister Controller, no se pudo traer los pre Registro ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteRegister = async(preRegisterId) =>{
    try {
        const deletedRegister = await PreMainPlace.findByIdAndDelete (preRegisterId);
        logger.info('Pre-Registro de Condominio eliminado con éxito');
        return deletedRegister;
    } catch (error) {
        const errorMessage = `Error en deleteRegister Controller, no se pudo eliminar el pre Registro ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports={
    createRegister,
    getRegister,
    deleteRegister
}