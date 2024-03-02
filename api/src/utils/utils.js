const logger = require('./logger'); 


const checkExistence = async (Model, id) => {

    const existence = await Model.findByPk(id);

    if (!existence) {
        logger.error(`No se encontró registro con ID: ${id}`);
        throw new Error(`No se encontró registro con ID: ${id}`);
    }
    return existence;
};


const handleSuccessResponse = (res, result, statusCode = 200) => {
    res.status(statusCode).json(result);
};


const handleErrorResponse = (res, error) => {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
};


const getArrayByIds = async (Model, ids) => {
    if (!ids || ids.length ===0) {
        return [];
    }
    return Promise.all(ids.map(id => Model.findByPk(id)));
};


const validateFunctionalToken = async (MainModel, functionalToken, ReferenceModel) => {
    const model = await MainModel.findOne({
      where: { token: functionalToken },
      include: [{ model: ReferenceModel, attributes: ['id'] }],
    });
    if (!model) {
        throw new Error('Token de acceso inválido');
      }
    
      return model;
    };

module.exports = {
    checkExistence,
    handleSuccessResponse,
    handleErrorResponse,
    getArrayByIds,
    validateFunctionalToken
};
