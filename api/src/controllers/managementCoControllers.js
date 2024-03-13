const {ManagementCo} = require("../db");
const {Op} = require('sequelize');
const {checkExistence} = require("../utils/utils");
const logger = require('../utils/logger');

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
                id: generateId(country, companyTaxId),
                country,
                companyTaxId,
                companyName,
                companyContact,
                companyPhone,
                companyEmail,
                logo, 
                isSuspended,
            }
        );
        
        // Lógica para generar el ID basado en el país y el ID de impuestos
        function generateId(country, companyTaxId) {
            return `${country.substring(0, 3)}${companyTaxId}`;
        }

        logger.info('Nueva Compañía creada con éxito');
        return newCompany;
    } catch (error) {
        const errorMessage = `Error en createManagementCo Controller, no se pudo crear la compañia ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
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
                id: companyId }}
            )
        if(!companyById) {
            throw Error ("No se encontraron Compañías")
        } else{
            const updatedCompany  = await ManagementCo.findByPk(companyId)
            logger.info('Empresa actualizada con ésxito.');
            return updatedCompany;
        }
    } catch (error) {
        const errorMessage = `Error en updateManagementCo Controller, no se pudo actualizar la compañia ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const deleteManagementCo = async (companyId) => {
    try {
        const deletedCompany =  await checkExistence(ManagementCo, companyId)
        await deletedCompany.destroy();
        logger.info('Empresa eliminada con éxito');
        return{message: 'La empresa se eliminó exitosamente'};
    } catch (error) {
        const errorMessage = `Error en deleteManagementCo Controller, no se pudo eliminar la compañia ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getAllManagementCo = async () =>{
    try {
        return await ManagementCo.findAll();
    } catch (error) {
        const errorMessage = `Error en getAllManagementCo Controller, no se pudo traer a todas las compañias ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

const getManagmentCoNoSuspended = async () =>{
    try {
        return await ManagementCo.findAll(
            {where: {isSuspended: false,}}
        );
    } catch (error) {
        const errorMessage = `Error en getManagmentCoNoSuspended Controller, no se pudo traer a todas las compañias no suspendidas ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getManagementCoByName = async (companyName) => {
        try {
          const companies = await ManagementCo.findAll({
            where: {
              companyName: {
                [Op.iLike]: `%${companyName}%`,
              },
            },
          });
          if (companies.length === 0) {
            throw new Error(errorMessage);
        }
          return companies;
        } catch (error) {
            const errorMessage = `Error en getManagementCoByName Controller, no se pudo traer la compañia por nombre ${error.message}`;
            logger.error(errorMessage);
            if (error.stack) {
                logger.error(error.stack);
            }
            throw new Error(errorMessage);
        }
    };


const getManagementCoById = async(companyId) =>{
    try {
        const company = await checkExistence(ManagementCo, companyId)
        return company;
    } catch (error) {
        const errorMessage = `Error en getManagementCoById Controller, no se pudo traer la compañia por id ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports ={
    createManagementCo,
    updateManagementCo,
    deleteManagementCo,
    getAllManagementCo,
    getManagmentCoNoSuspended,
    getManagementCoByName,
    getManagementCoById
};


