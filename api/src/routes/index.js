/*const { Router } = require('express')

const videogames = require('./videogames');
const videogame = require('./videogame');
const genres = require('./genres')
const createVideogame = require('./createVideogame')

const router = Router();


  // Busco un videogame por su ID
router.use('/videogame', videogame);
  // Busco los 100 primeros videogames o ?name="nemo" busco los de ese nombre
router.use('/videogames', videogames);
  // Busco todos los genres
router.use('/genres', genres); 
  // Creo un video juego POST
router.use('/videogames', createVideogame)


module.exports = router;*/

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogames = require("./videogames");
const genres = require("./genres");
const videogame = require("./videogame");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/videogame", videogame);

module.exports = router;