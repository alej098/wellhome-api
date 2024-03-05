const mongoose = require('mongoose');
const {Schema} =  mongoose;

const contactFormSchema = new Schema({
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
  foreName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/
  },
  phone:{
    type: String,
    required: true
  },
  subject: {
    type: String,
    enum: [
        'QUIERO IMPLEMENTARLO', 
        'NECESITO INFORMACION', 
        'OTRO ASUNTO'],
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  }
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;