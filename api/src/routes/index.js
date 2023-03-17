const { Router } = require('express')

const videogame = require('./videogame');
const videogames = require('./videogames');
const genres = require('./genres')
const createVideogame = require('./createVideogame')

const router = Router();

//Impoto los modulos del proyecto:
router.use('/videogame', videogame);// Busco un videogame por su ID 

router.use('/videogames', videogames); // Busco los 100 primeros videogames o ?name="nemo" busco los de ese nombre

router.use('/genres', genres); //Busco todos los generos
 
router.use('/videogames', createVideogame)//Crea un videojuego POST


module.exports = router;
