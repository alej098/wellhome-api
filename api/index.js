const app = require("./src/app");
const {conn} = require("./src/db");
const {
  mainPlaceInit,
  managementCoInit,
  userClassInit,
  userTypeInit,
  feeInit,
  componentClassInit,
  componentTypeInit,
  componentInit,
  propertyInit,
  userInit
  
} = require('./src/dataInit');

const PORT = process.env.PORT || 3001;

async function startServer(){
    try {
        await conn.sync({force: true}); // True Desarrollo - False Produccion
        
        await managementCoInit();
        await mainPlaceInit();
        await userClassInit();
        await userTypeInit();
        await feeInit();
        await componentClassInit();
        await componentTypeInit();
        await componentInit();
        await propertyInit();
        await userInit();
        
        app.listen(PORT, () => {
            console.log(`Server is running at Port:${PORT}`);
          }).on('error', (err) => {
            console.error("Failed to start the server", err);
          });
        } catch (error) {
          console.error("Error initializing the server", error);
        }
      }

startServer();
