const {Fee, MainPlace} = require ('../db');

const createFee = async(
    feeDescription,
    currency,
    amount,
    MainPlaceId
) => {
    const createNewFee = await Fee.create(
        {
            feeDescription,
            currency,
            amount,
            MainPlaceId
        }
    )
    return createNewFee;
};

const updateFee = async(
    feeId,
    feeDescription,
    currency,
    amount,
    MainPlaceId
) => {
    const fee = await Fee.update(
        {
            feeDescription,
            currency,
            amount,
            MainPlaceId
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