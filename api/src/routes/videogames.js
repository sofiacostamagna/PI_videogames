require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;

const { Videogame, Genre } = require('../db.js');

const router = Router();


// Query -> name ? db + api : 100 primeros juegos

router.get('/', async function (req, res) {
  const { name } = req.query;
  
  try {
    if (name) {
      let gamesDB = await Videogame.findOne({where: {name: name}, include: [Genre]});
      if (gamesDB){
          let X = gamesDB
          gamesDBFull = {
              id: X.id,
              name: X.name,
              image: X.image,
              rating: X.rating,
              source: "Created",
              genres: X.genres?.map(p => p.name).join(', '),
          }
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`) 
        gamesAPIFull = gamesAPI.data.results?.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            image: X.background_image,
            genres: X.genres && X.genres?.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        res.json(gamesAPIFull.concat(gamesDBFull))
      } else {
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`) 
        gamesAPIFull = gamesAPI.data.results?.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            image: X.background_image,
            genres: X.genres && X.genres?.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        res.json(gamesAPIFull)
      }
    } else {
      let gamesResults = []
      let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`
      for (let index = 0; index < 5; index++) {
        let games = (await axios.get(apiRAWG)).data
        let dataGame = games.results?.map((G) => {
          var game = {
            name: G.name,
            image: G.background_image,
            genres: G.genres?.map((gen) => gen.name).filter(p => p != null).join(', '),
            source: "Api",
            id: G.id,
            rating: G.rating
          };
          return game
        })
        apiRAWG = games.next;
        gamesResults = gamesResults.concat(dataGame)
      }
      
      let dbGames = await Videogame.findAll({ include: [Genre] })
      let jsonGames = dbGames?.map((J) => J.toJSON())
      jsonGames.forEach(C => {
        C.source = "Created", 
        C.genres = C.genres?.map((genre) => genre.name).filter(p => p != null).join(', ')
      });
      gamesResults = gamesResults.concat(jsonGames)
    
      res.json(gamesResults)
    }
  } catch (err) {
    res.status(404).json({ err })
  }
});


module.exports = router;


//-----------------------------------LO CREE YO----------------------------------------------
/*
//TRAIGO INFO DE LA API
const getApiInfo = async()=>{
  const apiUrl = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)
  // aca tambien hago los personajes por pagina
  apiInfo= await apiUrl.data.results.map(el => {
    return{
          id: el.id,
          name: el.name,
          image: el.image,
          rating: el.rating.toFixed(2),  // convierte a decimal un numero
          genres: el.genres?.map(g => g.name),
          platforms: el.platforms?.map(p=>p.platform.name),
          released: el.released
      
    };
  });
  return apiInfo;
};

//TRAIGO INFO DE LA DB
const getDbInfo = async ()=> {
  return await Videogame.findAll({ //aca pido que me traigo todos los VG
    include:{ // pero que me incluya el modelo genre
      model: Genre,
      attributes: ['name'], //de este modelo, traeme el atributo name
      through: {// este es una comprobacion que se hace cuando deseo traerme un atributo-> VA SIEMPRE
        attributes: [],
      }
    }

  })
}

//CONCANTENO LAS DOS FUNCIONES-> DB Y API
const getAllVideogames= async ()=>{
  const apiInfo= await getApiInfo();
  const dbInfo= await getDbInfo();
  //CONCATENO LAS DOS FUNCIONES
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal
}


//RUTA DEL GET y ?NAME:
router.get('/videogames', async (req, res)=>{

  const name = req.query.name // QUERY-> respecto a lo q escribo en la URL(name)//Buscamos si hay un name por query 

  let videogamesTotal = await getAllVideogames();

  if (name){//si hay un query
    let videogameName =  await videogamesTotal.filter(el => el.name.tolowerCase().includes(name.toLocaleLowerCase()))//fijate si en el total incluye el nombre q me pasaron por query
    // tolowerCase pasa todos los name a minusculas
    
    videogameName.length ?
    res.status(200).send(videogameName) :
    res.status(404).send('Game not found')
  
  } else {// si no hay un query
    res.status(200).send(videogamesTotal)

  }

})

module.exports = router;*/


