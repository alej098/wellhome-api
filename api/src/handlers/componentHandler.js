const logger = require('../utils/logger.js');
const {handleSuccessResponse, handleErrorResponse} = require('../utils/utils.js');

const {
    createNewClass,
    createNewType,
    createNewComponent,

    updateClassComponent,
    updateTypeComponent,
    updateComponent,

    deleteClassComponent,
    deleteTypeComponent,
    deleteComponent,

    getAllClassComponent,
    getAllTypeComponent,
    getAllComponent,

    getClassComponentById,
    getTypeComponentById,
    getComponentById

} = require ('../controllers/componentControllers');

const createClassComponentHandler = async(req, res) => {
    const {name} = req.body;
    try{
        const newClass = await createNewClass(name)
        logger.info('Creación exitosa de Clase de Componente');
        handleSuccessResponse(res, newClass, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const createTypeComponentHandler = async(req, res) => {
    const {name, ComponentClassId} = req.body;
    try{
        const newType = await createNewType(name, ComponentClassId);
        logger.info('Creación Exitosa de Tipo de Componente');
        handleSuccessResponse(res, newType, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const createComponentHandler =  async(req, res) => {
    const {
        name,
        code,
        location,
        description,
        acceptCost,
        ComponentTypeId,
        MainPlaceId,
        FeeId

    } = req.body;
    try {
        const newComponent = await createNewComponent(
            name,
            code,
            location,
            description,
            acceptCost,
            ComponentTypeId,
            MainPlaceId,
            FeeId
        )
        logger.info('Creación Exitosa de Componente');
        handleSuccessResponse(res, newComponent, 201);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const updateClassComponentHandler = async(req, res) => {
    const {classComponentId} = req.params;
    const {
        name,
        isSuspended
    } = req.body;
    try {
        const classComponent = await updateClassComponent(
            classComponentId,
            name,
            isSuspended
        );
        logger.info('Actualización Exitosa de Clase de Componente');
        handleSuccessResponse(res, classComponent);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const updateTypeComponentHandler = async(req, res) => {
    const {typeComponentId} = req.params;
    const {
        name,
        isSuspended,
        ComponentClassId
    } = req.body;
    try {
        const typeComponent = await updateTypeComponent(
            typeComponentId,
            name,
            isSuspended,
            ComponentClassId
        );
        logger.info('Actualización Exitosa del Tipo de Componente');
        handleSuccessResponse(res, typeComponent);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const updateComponentHandler = async(req, res) => {
    const {componentId} = req.params;
    const {
        name,
        code,
        location,
        description,
        acceptCost,
        isSuspended,
        ComponentTypeId,
        MainPlaceId,
        FeeId
    } = req.body;
    try {
        const component = await updateComponent(
        componentId,
        name,
        code,
        location,
        description,
        acceptCost,
        isSuspended,
        ComponentTypeId,
        MainPlaceId,
        FeeId
        )
        logger.info('Actualización Exitosa de un Componente');
        handleSuccessResponse(res, component);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const deleteClassComponentHandler = async (req, res) => {
    const {classComponentId} = req.params;
    try {
        const deleteClass = await deleteClassComponent(classComponentId);
        logger.info('Se eliminó exitosamente la Clase de Componente');
        handleSuccessResponse(res, deleteClass);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const deleteTypeComponentHandler = async(req, res) => {
    const {typeComponentId} = req.params;
    try {
        const deleteType = await deleteTypeComponent(typeComponentId);
        logger.info('Se eliminó exitosamente el Tipo de Componente');
        handleSuccessResponse(res, deleteType);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const deleteComponentHandler = async(req, res) => {
    const {componentId} = req.params;
    try {
        const component = await deleteComponent(componentId)
        logger.info('Se eliminó exitosamente el Componente');
        handleSuccessResponse(res, component);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getClassComponentHandler = async(req, res) =>{
    try {
        const classComponent = await getAllClassComponent()
        logger.info('Se trajeron a todas las Clases de Componentes');
        handleSuccessResponse(res, classComponent);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getTypeComponentHandler = async(req, res) =>{
    try {
        const typeComponent = await getAllTypeComponent()
        logger.info('Se trajeron a todos los Tipos de Componentes');
        handleSuccessResponse(res, typeComponent);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getComponentHandler = async(req, res) =>{
    try {
        const allComponent = await getAllComponent()
        logger.info('Se trajeron a todos los Componentes');
        handleSuccessResponse(res, allComponent);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getClassComponentByIdHandler = async(req, res) => {
    const {classComponentId} = req.params;
    try {
        const classComponentById = await getClassComponentById(classComponentId);
        logger.info('Se trajo exitosamente a una Clase de Componente por Id');
        handleSuccessResponse(res, classComponentById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getTypeComponentByIdHandler = async(req, res) => {
    const {typeComponentId} = req.params;
    try {
        const typeComponentById = await getTypeComponentById(typeComponentId);
        logger.info('Se trajo un Tipo de Componente por Id');
        handleSuccessResponse(res, typeComponentById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


const getComponentByIdHandler = async (req, res) => {
    const {componentId} = req.params;
    try {
        const componentById = await getComponentById(componentId);
        logger.info('Se trajo un componente por Id');
        handleSuccessResponse(res, componentById);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports = {
    createClassComponentHandler,
    createTypeComponentHandler,
    createComponentHandler,

    updateClassComponentHandler,
    updateTypeComponentHandler,
    updateComponentHandler,

    deleteClassComponentHandler,
    deleteTypeComponentHandler,
    deleteComponentHandler,

    getClassComponentHandler,
    getTypeComponentHandler,
    getComponentHandler,

    getClassComponentByIdHandler,
    getTypeComponentByIdHandler,
    getComponentByIdHandler
};