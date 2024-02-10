require('dotenv').config();
const jwt =  require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const verifyToken = (req, res, next) => {
    const tokenByQuery = req.query.key;
    const tokenByHeader = req.headers.authorization;
    if (!(tokenByHeader||tokenByQuery)) return res.status(403).send('Acceso denegado.');
    const token = tokenByHeader?.split(' ')[1] || tokenByQuery.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log('error: ', error.message);
      res.status(401).send('Token inválido.');
    }
  };
  
  module.exports = {
    verifyToken,
  };