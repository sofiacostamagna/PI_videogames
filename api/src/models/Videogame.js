const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,  // para generar un id unico y especifico que no se repite, aleatorio->para no pisarse con los de la API
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //no permite que este vacio->campo requerido
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating:{
      type: DataTypes.DECIMAL,
    },
    createInDb:{ 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    //Sirve por si queremos acceder al videojuego q solo creamos en la DB.
  },
  {timestamps:false});
};

