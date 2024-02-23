const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js')

const {
    createManagementCo,
    updateManagementCo,
    deleteManagementCo,
    getAllManagementCo,
    getManagementCoById
} = require ("../controllers/managementCoControllers");

const createManagementCoHandler = async (req, res) => {
    const {
        country,
        companyTaxId,
        companyName,
        companyContact,
        companyPhone,
        companyEmail,
        logo, 
        isSuspended
    } = req.body;

    try{
        const newManagementCo = await createManagementCo (
        country,
        companyTaxId,
        companyName,
        companyContact,
        companyPhone,
        companyEmail,
        logo, 
        isSuspended
        );
        logger.info('Creación Exitosa de Empresa Administradora');
        handleSuccessResponse(res, newManagementCo, 201);

    } catch (error) {
        handleErrorResponse(res, error);
    }
}

const updateManagementCoHandler = async (req, res) => {
    const {companyId} = req.params;
    const {
        country,
        companyName,
        companyContact,
        companyPhone,
        companyEmail,
        logo, 
        isSuspended
    } = req.body;
    try{
        const managementCo = await updateManagementCo (
        companyId,
        country,
        companyName,
        companyContact,
        companyPhone,
        companyEmail,
        logo, 
        isSuspended
        );
        logger.info('Actualización exitosa de Empresa Administradora');
        handleSuccessResponse(res, managementCo);

    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const deleteManagementCoHandler = async (req, res) => {
    const {companyId} = req.params;
    try{
        const deleteCompany = await deleteManagementCo(companyId);
        logger.info('Se eliminó exitosamente la Empresa Administradora');
        handleSuccessResponse(res, deleteCompany);

    } catch (error) {
        handleErrorResponse(res, error);
    }
};
 

const getManagementCoHandler = async (req, res) => {
    try{
        const allCompanies = await getAllManagementCo();
        logger.info('Se trajeron exitosamente todas las Empresas Administradoras');
        handleSuccessResponse(res, allCompanies);

    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getManagementCoByIdHandler = async (req, res) => {
    const {companyId} = req.params;
    try {
        const companyById = await getManagementCoById(companyId);
        logger.info('Se trajo exitosamente la Empresa Administradora por Id');
        handleSuccessResponse(res, companyById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports = {
    createManagementCoHandler,
    updateManagementCoHandler,
    deleteManagementCoHandler,
    getManagementCoHandler,
    getManagementCoByIdHandler
};