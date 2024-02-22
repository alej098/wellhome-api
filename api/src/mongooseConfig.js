require('dotenv').config();
const mongoose = require ('mongoose');
const logger = require('./utils/logger');
const { error } = require('winston');

const {
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE
} = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;

try {
    mongoose.connect(MONGODB_URI);
    
    const db = mongoose.connection;
    db.on('error', (error) => {
        logger.error('MongoDB connection error:', error);
        db.emit('mongodbError', error);
        process.exit(1);
    });

    db.once('open', () => {
        logger.info('Connected to MongoDB');
    });
} catch (error) {
    logger.error('Error connecting to MongoDB', error);
    process.exit(1);
}


module.exports = mongoose;