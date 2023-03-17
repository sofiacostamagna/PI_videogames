const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

//Recibe la data colectada desde el formulario por el body
// Creo el videojuego en la db

/*router.post('/videogames', async (req, res) => {
  const { name, description, image, relDate, rating, platforms, genres } = req.body;

  let platformString = platforms.join(', ')

  let gameCreated = await Videogame.create({
    name,
    description,
    image, 
    relDate,
    rating,
    platforms: platformString,
  })

  genres.forEach(async (G) => {
      let genresGame = await Genre.findOne({ where: { name: G } })
      await gameCreated.addGenre(genresGame)
  })
    res.send('Videogame created successfully!')
});


module.exports = router;

/*const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

// Crear un nuevo videojuego
router.post('/', async (req, res) => {
  try {
    const { name, description, image, relDate, rating, platforms, genres } = req.body;

  //Validar que los campos obligatorios estén presentes
   if (!name || !description || !relDate) {
    return res.status(400).send('Missing required fields');
    }

    // Crear el videojuego en la base de datos
    const videogame = await Videogame.create({
      name,
      description,
      image,
      relDate,
      rating,
      platforms: platforms.join(', '),
    });

    // Agregar los géneros a la relación del videojuego
    const genresToAdd = await Genre.findAll({ where: { name: genres } });
    await videogame.addGenres(genresToAdd);

    res.send('Videogame created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.post('/videogames', async (req, res) => { 
  try{
    const { name, description, image, relDate, rating, platforms, genres } = req.body;
    
    // Crear el videojuego en la base de datos
    const newVideogame = await Videogame.create({
      name,
      description,
      image,
      relDate,
      rating,
      platforms,
    })
    
    res.status(200).json(newVideogame);
    
  } catch (error){
    res.status(404).send(error.message)
  }
  
})*/

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
    
    console.log(gameCreated)
    
    await gameCreated.addGenre(gameGenre)
    
  } catch (err) {
    console.log(err);
  }
  res.send('Created succesfully')
});

module.exports = router;