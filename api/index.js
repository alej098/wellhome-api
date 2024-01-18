const app = require("./src/app");
const {conn} = require("./src/db");
const {
  mainPlaceInit,
  managementCoInit,
  userClassInit,
  userTypeInit,
  componentClassInit,
  componentTypeInit,
  componentInit
} = require('./src/dataInit');

const PORT = process.env.PORT || 3001;

async function startServer(){
    try {
        await conn.sync({force: true}); // True Desarrollo - False Produccion
        
        await managementCoInit();
        await mainPlaceInit();
        await userClassInit();
        await userTypeInit();
        await componentClassInit();
        await componentTypeInit();
        await componentInit();
        
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
