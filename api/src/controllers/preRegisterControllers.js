const {PreRegister} = require('../db');

const createPreRegisterForm = async (
    condoName,
    country,
    state,
    city,
    district,
    placeDescription,
    condoPhone,
    condoEmail,
    ownerId,
    foreName,
    lastName,
    phone,
    email
) => {
    const newRegisterForm = await PreRegister.create(
        {
            condoName,
            country,
            state,
            city,
            district,
            placeDescription,
            condoPhone,
            condoEmail,
            ownerId,
            foreName,
            lastName,
            phone,
            email
        }
    )
    return newRegisterForm;
};

const getPreRegisterForm = async () =>{
    const allPreRegisterForm = await PreRegister.findAll();

};

const deletePreRegisterForm = async(formId) =>{
    const RegisterForm = await PreRegister.destroy({
        where:{id: formId}
    });
    if (!RegisterForm) {
        throw new Error ("No existen Registros");
    }
    return "El Registro fue eliminado"
};

module.exports={
    createPreRegisterForm,
    getPreRegisterForm,
    deletePreRegisterForm
}