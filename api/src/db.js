const sequelize = require('./sequelizeConfig');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/modelsSQL'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/modelsSQL', file)));
  });

try {
  modelDefiners.forEach(model => model(sequelize));
  logger.info('Database synchronized succesfuly');
} catch (error) {
  logger.error('Error during model definition:', error);
}  

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {ManagementCo, MainPlace, Property, ComponentClass, ComponentType, Component, UserRol, UserClass, UserType, User, Fee, PreRegister} = sequelize.models;

ManagementCo.hasMany(MainPlace);
MainPlace.belongsTo(ManagementCo);

MainPlace.hasMany(Property);
Property.belongsTo(MainPlace);

MainPlace.hasMany(User);
User.belongsTo(MainPlace);

ComponentClass.hasMany(ComponentType);
ComponentType.belongsTo(ComponentClass);

ComponentType.hasMany(Component);
Component.belongsTo(ComponentType);

MainPlace.hasMany(Component);
Component.belongsTo(MainPlace);

MainPlace.hasMany(Fee);
Fee.belongsTo(MainPlace);

Fee.hasMany(Property);
Property.belongsTo(Fee);

Fee.hasMany(Component);
Component.belongsTo(Fee);

UserRol.hasMany(User);
User.belongsTo(UserRol);

UserClass.belongsToMany(UserType, { through: "UserClassType", timestamps: false });
UserType.belongsToMany(UserClass, { through: "UserClassType", timestamps: false });

UserType.belongsToMany(User, { through: "UserTypeUser", timestamps: false });
User.belongsToMany(UserType, { through: "UserTypeUser", timestamps: false, onDelete: 'CASCADE'});

User.belongsToMany(Property, { through: "UserProperty", timestamps: false, onDelete: 'CASCADE' });
Property.belongsToMany(User, { through: "UserProperty", timestamps: false });

module.exports = { 
  ManagementCo, 
  MainPlace, 
  Property, 
  ComponentClass, 
  ComponentType, 
  Component, 
  UserRol,
  UserClass, 
  UserType, 
  User,
  Fee, 
  PreRegister,
  conn: sequelize };