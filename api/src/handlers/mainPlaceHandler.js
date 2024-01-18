const {
    createMainPlace,
    updateMainPlace,
    deleteMainPlace,
    getAllMainPlace,
    getMainPlaceById

} = require ('../controllers/mainPlaceControllers');

const createMainPlaceHandler = async (req, res) => {
    const {
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        ManagementCoCompanyRUC
    } = req.body;

    try{
        const newMainPlace = await createMainPlace (
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        ManagementCoCompanyRUC
        );
        res.status(201).json(newMainPlace);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};


const updateMainPlaceHandler = async (req, res) =>{
    const {idMainPlace} = req.params;
    const {
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        managementCoId
    } = req.body;
    try {
        const mainPlace = await updateMainPlace (
        idMainPlace,
        name,
        country,
        state,
        city,
        district,
        placeDescription,
        placeImage,
        phone,
        email,
        isSuspended,
        managementCoId
        );
        res.status(200).json(mainPlace);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const deleteMainPlaceHandler =  async (req, res) => {
    const{idMainPlace} = req.params;
    try{
        const deletePlace = await deleteMainPlace(idMainPlace);
        res.status(200).json(deletePlace);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getMainPlaceHandler =  async (req, res) => {
    try {
        const allPlaces = await getAllMainPlace();
        res.status(200).json(allPlaces);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};


const getMainPlaceByIdHandler = async (req, res) => {
    const {idMainPlace} = req.params;
    try {
        const mainPlaceById = await getMainPlaceById(idMainPlace);
        res.status(200).json(mainPlaceById);
    }   catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports = {
    createMainPlaceHandler,
    updateMainPlaceHandler,
    deleteMainPlaceHandler,
    getMainPlaceHandler,
    getMainPlaceByIdHandler
};