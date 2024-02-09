const {ManagementCo} = require("../db");

const createManagementCo = async (
    country,
    companyTaxId,
    companyName,
    companyContact,
    companyPhone,
    companyEmail,
    logo, 
    isSuspended
) => {
    const newCompany = await ManagementCo.create(
        {
            country,
            companyTaxId,
            companyName,
            companyContact,
            companyPhone,
            companyEmail,
            logo, 
            isSuspended 
        }
    )
    return newCompany;
};


const updateManagementCo = async (
    idCompany,
    country,
    companyName,
    companyContact,
    companyPhone,
    companyEmail,
    logo, 
    isSuspended
) => {
    const companyById = await ManagementCo.update(
        {   country,
            companyName,
            companyContact,
            companyPhone,
            companyEmail,
            logo, 
            isSuspended
        },
        {where: { 
            companyTaxId: idCompany }}
        )
    if(!companyById) {
        throw Error ("No se encontraron Compañías")
    } else{
        const updatedCompany  = await ManagementCo.findByPk(idCompany)
        return updatedCompany;
    }
};


const deleteManagementCo = async (idCompany) => {
    const deletedCompany = await ManagementCo.destroy({
        where: {
            companyTaxId: idCompany},
    });
    if (!deletedCompany) {
        throw new Error ("No existen Compañías con ese id");
    }
    return "La Compañía se eliminó exitosamente";
};


const getAllManagementCo = async () =>{
    return await ManagementCo.findAll({
        where: {
            isSuspended: false
        },

    });
};


const getManagementCoById = async(idCompany) =>{
    const company = await ManagementCo.findOne({
        where: {
            companyTaxId: idCompany}
    });
    if (!company) throw Error("No existe la Compañía");
    return company;
};

module.exports ={
    createManagementCo,
    updateManagementCo,
    deleteManagementCo,
    getAllManagementCo,
    getManagementCoById
};


