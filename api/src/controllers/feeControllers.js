const {Fee, MainPlace} = require ('../db');
const logger = require('../utils/logger');

const createFee = async (
    feeDescription,
    currency,
    amount,
    MainPlaceId
) => {
    try {
        const createNewFee = await Fee.create({
            feeDescription,
            currency,
            amount,
            MainPlaceId
        });
        return createNewFee;
    } catch (error) {
        const errorMessage = `Error en createFee Controller, no se pudo crear la tarifa: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const updateFee = async (feeId, feeDescription, currency, amount, MainPlaceId) => {
    try {
        const fee = await Fee.update(
            {
                feeDescription,
                currency,
                amount,
                MainPlaceId
            },
            { where: { id: feeId } }
        );
        if (!fee) {
            throw new Error('No se encontraron tarifas para actualizar');
        } else {
            const updatedFee = await Fee.findByPk(feeId);
            return updatedFee;
        }
    } catch (error) {
        const errorMessage = `Error en el controlador updateFee: ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const deleteFee = async (feeId) => {
    try {
        const deletedFee = await Fee.destroy({
            where: { id: feeId }
        });
        if (!deletedFee) {
            throw new Error('No existen tarifas con ese Id');
        }
        return 'La tarifa se ha eliminado';
    } catch (error) {
        const errorMessage = `Error en el controlador deleteFee: no se pudo eliminar la tarifa ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getAllFee =  async() => {
    try {
         return await Fee.findAll()
    } catch (error) {
        const errorMessage = `Error en el controlador getAllFee: no se pudieron traer las tarifas ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


module.exports = {
    createFee,
    updateFee,
    deleteFee,
    getAllFee
}