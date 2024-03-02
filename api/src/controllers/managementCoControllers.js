const {ManagementCo} = require("../db");
const logger = require('../utils/logger');
const { checkExistence } = require("../utils/utils");

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
    try {
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
        );
        logger.info('Nueva Compañía creada con éxito');
        return newCompany;
    } catch (error) {
        logger.error(`Error al crear una nueva Empresa Administradora desde el controlador: ${error.message}`);
        throw new Error('Error interno al crear una nueva Empresa Administradora');
    }
};


const updateManagementCo = async (
    companyId,
    country,
    companyName,
    companyContact,
    companyPhone,
    companyEmail,
    logo, 
    isSuspended
) => {
    try {
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
                companyTaxId: companyId }}
            )
        if(!companyById) {
            throw Error ("No se encontraron Compañías")
        } else{
            const updatedCompany  = await ManagementCo.findByPk(companyId)
            logger.info('Empresa actualizada con ésxito.');
            return updatedCompany;
        }
    } catch (error) {
        logger.error(`Error al actualizar una Empresa desde el controlador: ${error.message}`);
        throw new Error('Error interno al actualizar una Empresa');
    }
};


const deleteManagementCo = async (companyId) => {
    try {
        const deletedCompany =  await checkExistence(ManagementCo, companyId)
        await deletedCompany.destroy();
        logger.info('Empresa eliminada con éxito');
        return{message: 'La empresa se eliminó exitosamente'};
    } catch (error) {
        logger.error(`Error al eliminar una Empresa desde el controlador: ${error.message}`);
        throw new Error('Error interno al eliminar la Empresa');
    }
};


const getAllManagementCo = async () =>{
    try {
        return await ManagementCo.findAll();
    } catch (error) {
        logger.error(`Error al traer a todas las empresas desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer a todas las Empresas');
    }
};


const getManagementCoById = async(companyId) =>{
    try {
        const company = await checkExistence(ManagementCo, companyId)
        return company;
    } catch (error) {
        logger.error(`Error al traer una Empresa por Id desde el controlador: ${error.message}`);
        throw new Error('Error interno al traer una Empresa por Id');
    }
    
};

module.exports ={
    createManagementCo,
    updateManagementCo,
    deleteManagementCo,
    getAllManagementCo,
    getManagementCoById
};


