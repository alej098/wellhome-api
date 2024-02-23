const mongoose = require('mongoose');
const {Schema} = mongoose;

const preMainPlaceSchema = new Schema({
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
        required: true,
        minlength: 10,
        maxlength: 300
    },
    phone: {
        type: String,
        unique: true,
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
    }

});

const PreMainPlace = mongoose.model('PreMainPlace', preMainPlaceSchema);

module.exports = PreMainPlace;