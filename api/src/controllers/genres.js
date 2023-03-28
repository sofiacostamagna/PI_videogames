const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getGenres = async () => { // obtiene los generos de la API
  try {
    const genresApi = await axios.get( 
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresTotal = genresApi.data.results?.map((e) => e.name);//Extrae solo el nombre de los generos
    
    genresTotal.forEach((e) => {
      Genre.findOrCreate({ //Busco si existe el genre en la DB con ese name
        where: { name: e },// si no encuentra lo crea y almacena en DB
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGenres;


 