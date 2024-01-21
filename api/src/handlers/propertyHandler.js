const {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    getPropertyById
} = require('../controllers/propertyControllers');

const createPropertyHandler = async (req, res) => {
    const {
        propertyType,
        mainGrouper,
        mainGrouperName,
        mainGrouperNumber,
        secondaryGrouper,
        status,
        subStatus,
        isSuspended,
        MainPlaceId,
        userDni
    } = req.body;
    try {
        const newProperty = await createProperty(
            propertyType,
            mainGrouper,
            mainGrouperName,
            mainGrouperNumber,
            secondaryGrouper,
            status,
            subStatus,
            isSuspended,
            MainPlaceId,
            userDni
        )
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updatePropertyHandler = async (req, res) => {
    const {propertyId} =  req.params;
    const {
        propertyType,
        mainGrouper,
        mainGrouperName,
        mainGrouperNumber,
        secondaryGrouper,
        status,
        subStatus,
        isSuspended,
        MainPlaceId,
        userDni
    } = req.body;
    try {
        const updateNewProperty = await updateProperty(
            propertyId,
            propertyType,
            mainGrouper,
            mainGrouperName,
            mainGrouperNumber,
            secondaryGrouper,
            status,
            subStatus,
            isSuspended,
            MainPlaceId,
            userDni
        );
        res.status(200).json(updateNewProperty);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const deletePropertyHandler = async (req, res) => {
    const {propertyId} = req.params;
    try {
        const deleteProper = await deleteProperty(propertyId);
        res.status(200).json(deleteProper);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getPropertyHandler = async (req, res) => {
    try {
        const property = await getProperty()
        res.status(200).json(property);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

const getPropertyByIdHandler = async (req, res) => {
    const {propertyId} = req.params;
    try {
        const propertyById = await getPropertyById(propertyId);
        res.status(200).json(propertyById);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports = {
    createPropertyHandler,
    updatePropertyHandler,
    deletePropertyHandler,
    getPropertyHandler,
    getPropertyByIdHandler
};