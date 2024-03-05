const mongoose = require('mongoose');
const {Schema} = mongoose;

const preMainPlaceSchema = new Schema({

    //Datos del Condominio, Primera parte del Formulario
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30    
    },
    country: {
        type: String,
        enum: [
            'PERU', 
            'CHILE', 
            'ARGENTINA', 
            'COLOMBIA',
            'BOLIVIA', 
            'ECUADOR', 
            'VENEZUELA', 
            'URUGUAY', 
            'PARAGUAY', 
            'MEXICO'],
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    placeDescription: {
        type: String,
        maxlength: 300
    },
    phone: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     validate: {
    //         validator: function (value) {
    //             return /^\S+@\S+\.\S+$/.test(value);
    //         },
    //         message: 'Email address is not valid'
    //     },
    //     required: true
    // },

    //Datos del Owner o "LocalAdmin"

    foreName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    dni: {
        type: String,
        required: true,
    },
    ownerPhone: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Email address is not valid'
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repeat_password: {
        type: String,
        required: true
    },
    checkbox_confirm: {
        type: Boolean,
        default: false
    }

});

const PreMainPlace = mongoose.model('PreMainPlace', preMainPlaceSchema);

module.exports = PreMainPlace;