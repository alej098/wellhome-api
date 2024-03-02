require('dotenv').config();
const jwt =  require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const {User, UserRol} =  require ("../db");

const verifyToken = async(req, res, next) => {
    const tokenByBearer = req.headers.authorization;
    const tokenByHeader = req.headers["x-access-token"];

    if (!(tokenByBearer||tokenByHeader)) return res.status(403).send('Acceso denegado, usted no tiene privilegios');
    const token = tokenByBearer?.split(' ')[1] || tokenByHeader;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;  
      req.userId = decoded.dni;

      const user = await User.findByPk(req.userId, {
              attributes:{exclude:['password']}
            });
            if (!user) return res.status(404).json({message: "Usuario no encontrado"});

      next();
    } catch (error) {
      console.error('Error en verifyToken middleware', error);
      res.status(401).send('Token inválido, consulte con su administrador.');
    }
  };

  const checkRol = (expectedRol) => async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);
      const rol = await UserRol.findOne({
        where: { id: user.UserRolId }
      });
      if (rol && expectedRol.includes(rol.name)) {
        next();
    
      } else {
        return res.status(403).json({ message: `No tiene permisos necesarios, consulte con su Administrador` });
      }
    } catch (error) {
      console.error(`Error in checkRol middleware:`, error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const isUser = checkRol(["Usuario"]);
  const isModerator = checkRol(["Moderador"]);
  const isLocalAdmin = checkRol(["Administrador"]);
  const isSuperAdmin = checkRol(["WebAppAdmin"]);
  const allAccess = checkRol(["Usuario", "Moderador", "Administrador", "WebAppAdmin"]);
  const adminLocalAccess = checkRol(["Moderador", "Administrador", "WebAppAdmin"]);
  const ownerLocalAccess = checkRol(["Administrador", "WebAppAdmin"]);
  const productOwnerAccess = checkRol(["WebAppAdmin"]);

  module.exports = {
    verifyToken,
    isUser,
    isModerator,
    isLocalAdmin,
    isSuperAdmin,
    allAccess,
    adminLocalAccess,
    ownerLocalAccess,
    productOwnerAccess
  };

