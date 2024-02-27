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

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords,
};