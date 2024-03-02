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
            'Perú', 
            'Chile', 
            'Argentina', 
            'Bolivia', 
            'Colombia', 
            'Ecuador', 
            'Venezuela', 
            'Uruguay', 
            'Paraguay', 
            'México'],
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
        minlength: 10,
        maxlength: 300
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Email address is not valid'
        },
        required: true
    },

    //Datos del Owner o "LocalAdmin"

    dni: {
        type: String,
        required: true,
        unique: true
    },
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
    ownerPassword: {
        type: String,
        required: true
    }

});

const PreMainPlace = mongoose.model('PreMainPlace', preMainPlaceSchema);

module.exports = PreMainPlace;