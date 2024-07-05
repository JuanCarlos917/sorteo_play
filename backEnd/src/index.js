const fs = require('fs');
const path = require('path');
const sequelize = require('./db');
const setRelations = require('./relations');

const basename = path.basename(__filename);

const modelDefiners = [];

// Leer todos los archivos de modelos y agregarlos al array modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) => file.indexOf('.') !== 0
			&& file !== basename
			&& file.slice(-3) === '.js',
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Agregar cada modelo a Sequelize
modelDefiners.forEach((model) => model(sequelize));

// Capitalizar los nombres de los modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Establecer relaciones entre modelos
setRelations(sequelize.models);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
