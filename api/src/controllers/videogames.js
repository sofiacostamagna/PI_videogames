const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

//TRAIGO LA INFORMACION DE LA API
const getApiInfo = async () => {
  try {
    const arrVideogames = []; //Este array es para guardar los videojuegos de cada pagina de la api, tiene 20 por pag
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;

    for (let i = 0; i < 5; i++) { //iterea 5 veces para traer los 100 videojuegos de la API
      //cuantas paginas para un total el total de videogames
      let pages = await axios.get(apiUrl);
      pages.data.results?.map((e) => { //accedemos a los datos del vg, mapeo y extraigo los siguientes datos
        arrVideogames.push({ //pushe a arrVideogames.
          id: e.id,
          name: e.name,
          image: e.background_image,
          genres: e.genres?.map((el) => el.name), //
          released: e.released,
          rating: e.rating,
          platforms: e.platforms?.map((el) => el.platform.name),
        });
      });
      apiUrl = pages.data.next; //actualiza el valor de la variables `apiUrl` para que contenga la URL de la siguiente pag
    }
    return arrVideogames;//retornamos array actualizado

  } catch (error) {
    console.log(error);
  }
};

//TRAIGO LA INFORMACION DE LA BASE DE DATOS
const getDbInfo = async () => { 
  const infoDb = await Videogame.findAll({ // obtengo todos los VG de la DB, del models videogame
    include: { // incluimos el models genre
      model: Genre,
      attributes: ["name"],
      through: { // indica que no se debe inlcuir las columnas adicionales de  la tabla de la relacion N:M
        attributes: [],
      },
    },
  });
  const mapInfoDb = infoDb?.map((e) => { //usamos map para transformar la info a una formato q coincida con la API
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
  return mapInfoDb;// Devuelve un array con la info de los VG de la DB
};

//CONCATENAMOS LAS DOS:
const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal; // Esta las dos info de la DB y API
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllVideogames,
};