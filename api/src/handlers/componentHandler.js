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
        res.status(201).json(newClass);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};


const createTypeComponentHandler = async(req, res) => {
    const {name, ComponentClassId} = req.body;
    try{
        const newType = await createNewType(name, ComponentClassId);
        res.status(201).json(newType);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};


const createComponentHandler =  async(req, res) => {
    const {
        name,
        code,
        location,
        description,
        ComponentTypeId,
        MainPlaceId

    } = req.body;
    try {
        const newComponent = await createNewComponent(
            name,
            code,
            location,
            description,
            ComponentTypeId,
            MainPlaceId
        )
        res.status(201).json(newComponent);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};


const updateClassComponentHandler = async(req, res) => {
    const {idClassComponent} = req.params;
    const {
        name,
        isSuspended
    } = req.body;
    try {
        const classComponent = await updateClassComponent(
            idClassComponent,
            name,
            isSuspended
        );
        res.status(200).json(classComponent);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};


const updateTypeComponentHandler = async(req, res) => {
    const {idTypeComponent} = req.params;
    const {
        name,
        isSuspended,
        ComponentClassId
    } = req.body;
    try {
        const typeComponent = await updateTypeComponent(
            idTypeComponent,
            name,
            isSuspended,
            ComponentClassId
        );
        res.status(200).json(typeComponent);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const updateComponentHandler = async(req, res) => {
    const {idComponent} = req.params;
    const {
        name,
        code,
        location,
        description,
        isSuspended,
        ComponentTypeId,
        MainPlaceId
    } = req.body;
    try {
        const component = await updateComponent(
        idComponent,
        name,
        code,
        location,
        description,
        isSuspended,
        ComponentTypeId,
        MainPlaceId
        )
        res.status(200).json(component);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const deleteClassComponentHandler = async (req, res) => {
    const {idClassComponent} = req.params;
    try {
        const deleteClass = await deleteClassComponent(idClassComponent);
        res.status(200).json(deleteClass);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const deleteTypeComponentHandler = async(req, res) => {
    const {idTypeComponent} = req.params;
    try {
        const deleteType = await deleteTypeComponent(idTypeComponent);
        res. status(200).json(deleteType);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const deleteComponentHandler = async(req, res) => {
    const {idComponent} = req.params;
    try {
        const component = await deleteComponent(idComponent)
        res.status(200).json(component);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getClassComponentHandler = async(req, res) =>{
    try {
        const classComponent = await getAllClassComponent()
        res.status(200).json(classComponent);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getTypeComponentHandler = async(req, res) =>{
    try {
        const typeComponent = await getAllTypeComponent()
        res.status(200).json(typeComponent);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getComponentHandler = async(req, res) =>{
    try {
        const allComponent = await getAllComponent()
        res.status(200).json(allComponent);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getClassComponentByIdHandler = async(req, res) => {
    const {idClassComponent} = req.params;
    try {
        const classComponentById = await getClassComponentById(idClassComponent);
        res.status(200).json(classComponentById);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getTypeComponentByIdHandler = async(req, res) => {
    const {idTypeComponent} = req.params;
    try {
        const typeComponentById = await getTypeComponentById(idTypeComponent);
        res.status(200).json(typeComponentById);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getComponentByIdHandler = async (req, res) => {
    const {idComponent} = req.params;
    try {
        const componentById = await getComponentById(idComponent);
        res.status(200).json(componentById);
    } catch (error) {
        res.status(400).send({error: error.message});
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