/*const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

//Recibe la data colectada desde el formulario por el body
// Creo el videojuego en la db

router.post('/', async (req, res) => {
  let { 
    name,
    description, 
    image,
    relDate, 
    rating, 
    genres,
    createdInDb, 
    platforms 
  } = req.body;

  platforms = platforms.join(', '); // convierte un arreglo de plataformas en una cadena separada
  console.log(req.body)
  try {
    const gameCreated = await Videogame.create({
      
      name,
      description,
      image,
      relDate,
      rating,
      platforms,
      createdInDb,
      
    })
    const gameGenre = await Genre.findAll({
      where: {
        name: genres
      }
    })
   
   
   await gameCreated.addGenre(gameGenre)
    res.status(200).send(gameCreated)
    
  } catch (err) {
    res.status(404).send(err.message)
  }
});

module.exports = router;*/



/*const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

// Recibe la data colectada desde el formulario por el body
// Crea el videojuego en la db

router.post('/', async (req, res) => {
  try {
    // Validación de entrada de datos
    const { 
      name,
      description, 
      image,
      relDate, 
      rating, 
      genres,
      createdInDb, 
      platforms 
    } = req.body;

    if (!name || !description || !genres || !platforms) {
      return res.status(400).send('Missing required fields');
    }

    // Convierte un arreglo de plataformas en una cadena separada
    const platformList = platforms.join(', ');

    console.log(req.body)

    // Crea el juego en la base de datos
    const gameCreated = await Videogame.create({
      name,
      description,
      image,
      relDate,
      rating,
      platforms: platformList,
      createdInDb,
    });

    // Busca los géneros en la base de datos
    const gameGenres = await Genre.findAll({
       where: {
        name: genres
     }
    });

    // Asocia los géneros con el juego
    await gameCreated.addGenre(gameGenres);

    res.status(201).send(gameCreated);
    
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error creating game: ${err}`);
  }
});

module.exports = router;*/



    

//--------------------------------------LO CREE YO ----------------------------------------------------------

/*const { route } = require("./videogames");

router.post('/', async (req,res)=>{
  const { 
    name, 
    description, 
    image, 
    relDate,
    rating, 
    createInDb, 
    platforms, 
    genre
  } = req.body

  let createVideogame = await Videogame.create({
    name,
    description,
    image,
    relDate, 
    rating,
    platforms,
    createInDb
  })

  let genresDb = await Genre.findAll({ //tengo que buscar en mi modelo genre, todas las que llegan por body
    where: { name : genre} // name sae igual al genre que me llega por body
  })

  createVideogame.addGenres(genresDb)
  res.status(200).send('Videogame created successfully')
});


module.exports = router;*/
