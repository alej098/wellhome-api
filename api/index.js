const app = require('./src/app');
const {conn} = require('./src/db');
const mongoose = require('./src/mongooseConfig')
const logger = require('./src/utils/logger');

const {
  contactFormInit,
  preRegisterInit,
  userRolInit,
  userClassInit,
  userTypeInit,
  componentClassInit,
  componentTypeInit,
  managementCoInit,
  mainPlaceInit,
  componentInit,
  feeInit,
  propertyInit,
  userInit
  
} = require('./src/utils/dataInit');

const PORT = process.env.PORT || 3001;

async function startServer(){
    try {
      if (process.env.NODE_ENV === 'development') {
        await conn.sync({ force: true });
      } else {
        await conn.sync();
      }
  
      // Reiniciar la base de datos de Mongoose (solo si force es true)
      if (process.env.NODE_ENV === 'development') {
        await mongoose.connection.dropDatabase();
      }
        await contactFormInit();
        await preRegisterInit();
        await userRolInit();
        await userClassInit();
        await userTypeInit();
        await componentClassInit();
        await componentTypeInit();
        await managementCoInit();
        await mainPlaceInit();
        await feeInit();
        await componentInit();
        await propertyInit();
        await userInit();
        
        app.listen(PORT, () => {
            logger.info(`Server is running at Port:${PORT}`);
          }).on('error', (err) => {
            logger.error(`Failed to start the server: ${err.message}`);
            
          });
        } catch (error) {
          logger.error(`Error initializing the server: ${error.message}`);
          
        }
      }

startServer();
