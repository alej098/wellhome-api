const ResidentForm = require('../modelsNoSql/ResidentForm');
const logger = require('../utils/logger');

const createResidentForm = async (foreName, lastName, dni, phone, email, password, userType, checkbox_confirm) => {
    try {
        const newResident = await ResidentForm({
            foreName,
            lastName,
            dni,
            phone,
            email,
            password,
            userType,
            checkbox_confirm
        });
        await newResident.save();
        logger.info('Nuevo pre-registro de residente creado con éxito');
        return newResident;
    } catch (error) {
        const errorMessage = `Error en createResidentForm Controller, no se pudo crear el pre Registro de residente ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports = {
    createResidentForm
};