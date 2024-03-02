const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (data, secret, expiresIn) => {
    return jwt.sign(data, secret, { expiresIn });
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateRandomToken = () => {
    const getRandomInt = (min, max) => Math.floor(Math.random()*(max-min+1)+ min);
    const randomDigits = Array.from({length:9}, () => getRandomInt(0,9)).join('');
    return `${randomDigits.substring(0, 3)}-${randomDigits.substring(3, 6)}-${randomDigits.substring(6)}`;
}

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords,
    generateRandomToken
};