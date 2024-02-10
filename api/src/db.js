require ("dotenv").config();
const {Sequelize} = require("sequelize");
const fs = require('fs');
const path = require('path');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {logging: false});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {ManagementCo, MainPlace, Property, ComponentClass, ComponentType, Component, UserClass, UserType, User, Fee} = sequelize.models;

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

Fee.hasMany(Property);
Property.belongsTo(Fee);

Fee.hasMany(Component);
Component.belongsTo(Fee);

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
  UserClass, 
  UserType, 
  User,
  Fee, 
  conn: sequelize };