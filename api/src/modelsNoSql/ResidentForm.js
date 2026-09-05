const mongoose = require('mongoose');
const {Schema} = mongoose;

const residentFormSchema = new Schema({
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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
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
    userType: {
        type: String,
        enum: ['inquilino', 'propietario'],
        required: true
    },
    checkbox_confirm: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const ResidentForm = mongoose.model('ResidentForm', residentFormSchema);

module.exports = ResidentForm;