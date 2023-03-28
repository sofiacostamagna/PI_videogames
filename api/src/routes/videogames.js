
const { Router } = require("express");
const { getAllVideogames } = require("../controllers/videogames");

const router = Router();

//RUTA /videogames  y /?=name -> trae todos los videogames y por su nombre
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const videogamesTotal = await getAllVideogames(); // llamamos a la funcion getAllVideogames(DB + API)
    if (name) { //si existe el name
      const videogameName = videogamesTotal.filter((e) => //se filtra los VG con el name especificado
        e.name.toLowerCase().includes(name.toLowerCase()) //ingnoramos si tiene Mayuscula
      );
      videogameName.length
        ? res.status(200).send(videogameName)
        : res.status(404).send("No existe el Videojuego");
        //si encontramos VG q coincida con el name ->return se devuelve todos las coincidencias
        //si no se encuentra coicidencia retorna error
    } else {
      res.status(200).send(videogamesTotal);//si no se especifico el name, devolvemos la lista completa de VG
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;