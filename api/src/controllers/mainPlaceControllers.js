const {MainPlace} = require('../db');
const logger = require('../utils/logger');
const { checkExistence } = require('../utils/utils');


const createMainPlace = async (
    name,
    country,
    state,
    city,
    district,
    address1,
    address2,
    placeDescription,
    placeImage,
    phone,
    email,
    isSuspended,
    ManagementCoId
) => {
    try {
        const newMainPlace = await MainPlace.create(
            {
                id: generateId(country, city),
                name,
                country,
                state,
                city,
                district,
                address1,
                address2,
                placeDescription,
                placeImage,
                phone,
                email,
                isSuspended,
                ManagementCoId,
            }
        );

        function generateId(country, city) {
            const countryCode = country.substring(0, 3).toUpperCase();
            const cityCode = city.substring(0, 3).toUpperCase();
            const correlativo = generateCorrelativo(); 
            const id = `${countryCode}${cityCode}${correlativo}`;
            return id;
        }
        
        function generateCorrelativo() {
            if (typeof global.correlativo === 'undefined') {
                global.correlativo = 1;
            } else {
                global.correlativo++;
            }
            const correlativoString = String(global.correlativo).padStart(5, '0');
            return correlativoString;
        }

        return newMainPlace;
    } catch (error) {
        const errorMessage = `Error en createMainPlace Controller, no se pudo crear el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const updateMainPlace =  async (
    mainPlaceId,
    name,
    country,
    state,
    city,
    district,
    address1,
    address2,
    placeDescription,
    placeImage,
    phone,
    email,
    isSuspended,
    managementCoId
) => {
    try {
        const mainPlaceById = await MainPlace.update(
            {   name,
                country,
                state,
                city,
                district,
                address1,
                address2,
                placeDescription,
                placeImage,
                phone,
                email,
                isSuspended,
                managementCoId
            },
            {where: { id: mainPlaceId }}
        )
        if(!mainPlaceById) {
            throw Error ('No se encontraron Condominios')
        }   else{
            const updatedMainPlace = await MainPlace.findByPk(mainPlaceId)
            logger.error('Condominio actualizado con éxito.')
            return updatedMainPlace;
        } 
    } catch (error) {
        const errorMessage = `Error en updateMainPlace Controller, no se pudo actualizar el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const deleteMainPlace = async (mainPlaceId) => {
    try {
        const deletedMainPlace = await checkExistence(MainPlace, mainPlaceId)
        await deletedMainPlace.destroy();
        logger.info ('Condominio eliminado con éxito')
        return { message: "Condominio eliminado exitosamente" };
    } catch (error) {
        const errorMessage = `Error en deleteMainPlace Controller, no se pudo eliminar el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getAllMainPlace = async () =>{
    try {
        return await MainPlace.findAll({
            where:{
                isSuspended:false
            },
        });
    } catch (error) {
        const errorMessage = `Error en getAllMainPlace Controller, no se pudo traer el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};



const getMainPlaceByName = async (name) => {
    try {
      const mainPlaces = await MainPlace.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      return mainPlaces;
    } catch (error) {
        const errorMessage = `Error en getMainPlaceByName Controller, no se pudo traer por nombre el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const getMainPlaceById = async(mainPlaceId) =>{
    try {
        const place = await MainPlace.findOne({
            where: {id: mainPlaceId}
        });
        if (!place) throw Error("No existe el Condominio")
        return place;
    } catch (error) {
        const errorMessage = `Error en getMainPlaceById Controller, no se pudo traer por id el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const patchMainPlace = async (
    mainPlaceId,
    address1,
    address2,
    placeDescription,
    placeImage,
    phone,
    email
) => {
    try {
        const updatedMainPlace = await checkExistence(MainPlace, mainPlaceId);
        await updatedMainPlace.update({
            address1,
            address2,
            placeDescription,
            placeImage,
            phone,
            email
        },
        {   
            where :{id: mainPlaceId}
        })
        return updatedMainPlace;
    } catch (error) {
        const errorMessage = `Error en patchMainPlace Controller, no se pudo editar el condominio ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};


const logicalDelete = async (
    mainPlaceId,
    isSuspended
) => {
    try {
        const deletedMainPlace = await checkExistence(MainPlace, mainPlaceId);
        await deletedMainPlace.update({
            isSuspended
        },
        {   
            where :{id: mainPlaceId}
        })
        return deletedMainPlace;
    } catch (error) {
        const errorMessage = `Error en logicalDelete Controller ${error.message}`;
        logger.error(errorMessage);
        if (error.stack) {
            logger.error(error.stack);
        }
        throw new Error(errorMessage);
    }
};

module.exports ={
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceByName,
    getMainPlaceById,
    patchMainPlace,
    logicalDelete
};