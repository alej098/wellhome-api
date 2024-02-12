require('dotenv').config();
const jwt =  require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const {User} =  require ("../db");

const verifyToken = async(req, res, next) => {
    const tokenByBearer = req.headers.authorization;
    const tokenByHeader = req.headers["x-access-token"];

    if (!(tokenByBearer||tokenByHeader)) return res.status(403).send('Acceso denegado');
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
      res.status(401).send('Token inválido.');
    }
  };
  
  module.exports = {
    verifyToken,
  };


  // const verifyToken = async (req, res, next) => {
  //     const tokenByHeader = req.headers["x-access-token"];

  //     console.log(tokenByHeader)

  //     if (!tokenByHeader) return res.status(403).json({message: "TOKEN NOT FOUND"})

  //     const decoded= jwt.verify(tokenByHeader, JWT_SECRET)
  //     console.log(decoded)

  //     req.userDni = decoded.dni;
  //     const user = await User.findByPk(req.userDni, {
  //       attributes:{exclude:['password']}
  //     });
  //     console.log(user)
  //     if (!user) return res.status(404).json({message: "Usuario no encontrado"})

  //     next();
  //   };

  //   module.exports = {verifyToken};

