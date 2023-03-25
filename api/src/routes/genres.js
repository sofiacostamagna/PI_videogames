const { Router } = require("express");
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;


//-------------------------------------------LO CREE YO-----------------------------------------------------------

/*router.get('/genres', async (res,req)=>{

    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) //entra a la Api y me trae info

    const genres = genresApi.data.map(el => el.genres)// mape esa info.El primer map devuelve muchos array

    const genEach = genres.map(el => { // hago un 2 map e ingreso a cada uno de esos array, lo recorro con un for

        for( let i=0; i<el.length; i++) return el[i]}) // devulvemos cada array en i

    genEach.forEach(el => {// para cada uno de estos genres

        Genre.findOrCreate({ //creame una si esta no esta, si esta no lo crea en donde el nombre sea lo que le pasamos
            where: { name: el}
        })
    })
    const allGenres = await genres.findAll();
    res.send(allGenres);
    })



module.exports = router;*/

