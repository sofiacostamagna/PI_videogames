const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

//TRAIGO LA INFORMACION DE LA API
const getApiInfo = async () => {
  try {
    const arrVideogames = []; //Este array es para guardar los 20 videojuegos de cada pagina de la api
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;

    for (let i = 0; i < 5; i++) {
      //Necesito 5 paginas para un total de 100 videjuegos
      let pages = await axios.get(apiUrl);
      pages.data.results?.map((e) => {
        arrVideogames.push({
          id: e.id,
          name: e.name,
          image: e.background_image,
          genres: e.genres?.map((el) => el.name), //
          released: e.released,
          rating: e.rating,
          platforms: e.platforms?.map((el) => el.platform.name),
        });
      });
      apiUrl = pages.data.next;
    }
    return arrVideogames;
  } catch (error) {
    console.log(error);
  }
};

//TRAIGO LA INFORMACION DE LA BASE DE DATOS
const getDbInfo = async () => {
  const infoDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const mapInfoDb = infoDb?.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      genres: e.genres?.map((e) => e.name),
      description: e.description,
      released: e.released,
      rating: e.rating,
      plataforms: e.platforms?.map((el) => el),
      createdInDb: e.createdInDb,
    };
  });
  return mapInfoDb;
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllVideogames,
};