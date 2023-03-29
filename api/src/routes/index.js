//COMBINAMOS TODOS LOS ROUTERS:

const { Router } = require("express");

// Importar todos los routers;
const videogames = require("./videogames");
const genres = require("./genres");
const videogame = require("./videogame");
const deleteVideogames = require('./deleteVideogames')



const router = Router();

// Configurar los routers
//GET:
router.use("/videogames", videogames);
router.use("/genres", genres);
router.use('/videogames/:id', videogame);
//POST:
router.use("/videogames", videogame);
//DELETE
router.use('/videogames', deleteVideogames);




module.exports = router;