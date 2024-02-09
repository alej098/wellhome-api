const {Fee} = require ('../db');

const createFee = async(
    mainPlace,
    feeDescription,
    currency,
    amount
) => {
    const createNewFee = await Fee.create(
        {
            mainPlace,
            feeDescription,
            currency,
            amount
        }
    )
    return createNewFee;
};

const updateFee = async(
    feeId,
    mainPlace,
    feeDescription,
    currency,
    amount
) => {
    const fee = await Fee.update(
        {
            mainPlace,
            feeDescription,
            currency,
            amount
        },
        {where:{id: feeId}}
    )
    if (!fee) {
        throw Error ('No se encontraron tarifas')
    }   else {
        const updatedFee  = await Fee.findByPk(feeId)
        return updatedFee;
    }
};

const deleteFee = async(feeId) => {
    const deletedFee = await Fee.destroy({
        where: {id: feeId}
    });
    if (!deletedFee) {
        throw new Error ('No existen tarifas con ese Id');
    }
    return 'La tarifa se ha eliminado';
};

const getAllFee =  async() => {
    return await Fee.findAll()
};

module.exports = {
    createFee,
    updateFee,
    deleteFee,
    getAllFee
}