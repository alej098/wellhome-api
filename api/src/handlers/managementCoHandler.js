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
        res.status(201).json(newManagementCo);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }   
};


const updateManagementCoHandler = async (req, res) => {
    const {idCompany} = req.params;
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
        idCompany,
        country,
        companyName,
        companyContact,
        companyPhone,
        companyEmail,
        logo, 
        isSuspended
        );
        res.status(200).json(managementCo);
    } catch (error){
        res.status(400).send({error: error.message});
    }
};


const deleteManagementCoHandler = async (req, res) => {
    const {idCompany} = req.params;
    try{
        const deleteCompany = await deleteManagementCo(idCompany);
        res.status(200).json(deleteCompany);
    } catch (error) {
      res.status(400).send({error: error.message});  
    }
};
 

const getManagementCoHandler = async (req, res) => {
    try{
        const allCompanies = await getAllManagementCo();
        res.status(200).json(allCompanies);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getManagementCoByIdHandler = async (req, res) => {
    const {idCompany} = req.params;
    try {
        const companyById = await getManagementCoById(idCompany);
        res.status(200).json(companyById);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports = {
    createManagementCoHandler,
    updateManagementCoHandler,
    deleteManagementCoHandler,
    getManagementCoHandler,
    getManagementCoByIdHandler
};