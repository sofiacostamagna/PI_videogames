/*const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,  // para generar un id unico y especifico que no se repite, aleatorio
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //no permite que este vacio
      primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,

    },
    plataform:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relDate: {
      type: DataTypes.STRING,
    },
    rating:{
      type: DataTypes.INTEGER,
    },
    createInDb:{ 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {timestamps:false});
};*/

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo correspondiente a la tabla videogame
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reldate: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull:false
    }
  });
};
