const { DataTypes } = require('sequelize');
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
    platforms:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
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
};

