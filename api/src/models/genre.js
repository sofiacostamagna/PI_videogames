/*const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {

    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
 });
};*/

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo correspondiente a la tabla genre
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
      name: {
          type: DataTypes.STRING
      }
  });
};