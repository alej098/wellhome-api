const {
    createFee,
    updateFee,
    deleteFee,
    getAllFee

} = require ('../controllers/feeControllers.js');

const createFeeHandler = async (req, res) => {
    const {
        feeDescription,
        currency,
        amount,
        MainPlaceId
    } = req.body;

    try{
        const newFee = await createFee (
        feeDescription,
        currency,
        amount,
        MainPlaceId
        );
        res.status(201).json(newFee);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateFeeHandler = async(req, res) =>{
    const {feeId} = req.params;
    const {
        feeDescription,
        currency,
        amount,
        MainPlaceId
    } = req.body;
    try {
        const fee = await updateFee(
            feeId,
            feeDescription,
            currency,
            amount,
            MainPlaceId
        );
        res.status(200).json(fee);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};

const deleteFeeHandler = async (req, res) => {
    const {feeId} = req.params;
    try {
        const destroyFee = await deleteFee(feeId);
        res.status(200).json(destroyFee);
    }   catch(error) {
        res.status(400).send({error: error.message});
    }
};

const getFeeHandler =  async(req, res) => {
    try {
        const fee = await getAllFee()
        res.status(200).json(fee);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports = {
    createFeeHandler,
    updateFeeHandler,
    deleteFeeHandler,
    getFeeHandler
};