const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo

module.exports = (sequelize) => {// hacemos la conexion a sequelize
 
  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING,
    },
  },
  {timestamps:false});
};

// no paso el ID, no vamos a tener otro tipo de datos de genres y SQL lo genera solito

