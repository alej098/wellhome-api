const { User, UserType, Property } = require("../db");

const getArrayByIds = async (Model, ids) => {
    if (!ids || ids.length === 0) {
        return [];
    }
    return Promise.all(ids.map(id => Model.findByPk(id)));
};


const createNewUser = async (
    dni,
    foreName,
    lastName,
    phone,
    email,
    password,
    status,
    isAdmin,
    acceptCost,
    isSuspended,
    MainPlaceId,
    UserRolId,
    userTypeId,
    propertyId
) => {
    const arrayOfUserType = await getArrayByIds(UserType, userTypeId);
    const arrayOfProperty = await getArrayByIds(Property, propertyId);

    const newUser = await User.create({
        dni,
        foreName,
        lastName,
        phone,
        email,
        password,
        status,
        isAdmin,
        acceptCost,
        isSuspended,
        MainPlaceId,
        UserRolId,
        userTypeId,
        propertyId
    });

    await newUser.setUserTypes(arrayOfUserType);
    await newUser.setProperties(arrayOfProperty);

    return newUser;
};

const updateUser = async (
    idUser,
    foreName,
    lastName,
    phone,
    email,
    password,
    status,
    isAdmin,
    acceptCost,
    isSuspended,
    MainPlaceId,
    UserRolId,
    userTypeId,
    propertyId
) => {
    const user = await User.findByPk(idUser);

    if (!user) {
        throw Error("No se encontró el usuario con este ID");
    }

    user.foreName = foreName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;
    user.password = password;
    user.status = status;
    user.isAdmin = isAdmin;
    user.acceptCost = acceptCost;
    user.isSuspended = isSuspended;
    user.MainPlaceId = MainPlaceId;
    user.UserRolId = UserRolId;
    user.propertyId = propertyId;

    await user.save();

    const arrayOfUserType = await getArrayByIds(UserType, userTypeId);
    const arrayOfProperty = await getArrayByIds(Property, propertyId);

    await user.setUserTypes(arrayOfUserType);
    await user.setProperties(arrayOfProperty);

    return user;
};

const deleteUser = async (idUser) => {
    const user = await User.findByPk(idUser);

    if (!user) {
        throw Error("No se encontró el usuario con este ID");
    }

    await user.destroy();

    return { message: "Usuario eliminado exitosamente" };
};

const getAllUsers = async () => {
    return await User.findAll({
            where : {isSuspended: false},
            include: [
                {
                    model: UserType,
                    attributes: ['name'],
                },
                // {
                //     model: Property,
                //     attributes: ['maingrouper', 'mainGrouperName', 'mainGrouperNumber'],
                // },
            ],
        });
};

const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: UserType,
                    attributes: ['name'],
                },
                {
                    model: Property,
                    attributes: ['mainGrouper', 'mainGrouperName', 'mainGrouperNumber'],
                },
            ],
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    } catch (error) {
        throw new Error(`Error al obtener el usuario por ID: ${error.message}`);
    }
};

module.exports = {
    createNewUser,
    updateUser, 
    deleteUser,
    getAllUsers,
    getUserById
};
