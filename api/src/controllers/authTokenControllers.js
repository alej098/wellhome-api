require('dotenv').config();
const jwt =  require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const {User} =  require ("../db");

const verifyToken = async(req, res, next) => {
    const tokenByBearer = req.headers.authorization;
    const tokenByHeader = req.headers["x-access-token"];

    if (!(tokenByBearer||tokenByHeader)) return res.status(403).send('Acceso denegado, usted no tiene privilegios');
    const token = tokenByBearer?.split(' ')[1] || tokenByHeader;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
     
      // req.user = decoded.dni;
      // const user = await User.findByPk(req.user, {
      //         attributes:{exclude:['password']}
      //       });
      //       console.log(user)
      //       if (!user) return res.status(404).json({message: "Usuario no encontrado"});

      next();
    } catch (error) {
      console.log('error: ', error.message);
      res.status(401).send('Token inválido, consulte con su administrador.');
    }
  };
  
  module.exports = {
    verifyToken,
  };

