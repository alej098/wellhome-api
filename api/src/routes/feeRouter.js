const {Router} = require('express');
const { verifyToken,
        isSuperAdmin,
        isLocalAdmin, 
        isModerator, 
        isUser,
        allAccess,
        adminLocalAccess,
        ownerLocalAccess,
        productOwnerAccess
    } = require ('../controllers/authTokenControllers');

const {
    createFeeHandler,
    updateFeeHandler,
    deleteFeeHandler,
    getFeeHandler,
    // getFeeByIdHandler
} = require('../handlers/feeHandler');

const feeRouter = Router();

feeRouter.post('/', createFeeHandler);
feeRouter.put('/:feeId', updateFeeHandler);
feeRouter.delete('/:feeId', deleteFeeHandler);
feeRouter.get('/', getFeeHandler);
// feeRouter.get('/', getFeeByIdHandler);

module.exports = feeRouter;