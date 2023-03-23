require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db.js');

const router = Router();

// Obtengo los genres desde la API y los guardo en la DB

router.get('/', async function (req, res) {
    try{
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        genresAPI.data.results.forEach(p => {
            Genre.findOrCreate({
                where: { name: p.name }
            })
        })
        const genresDB = await Genre.findAll()
        res.json(genresDB)
    } catch (err) {
        res.status(404).json({ err })
    }
})


module.exports = router;


//-------------------------------------------LO CREE YO-----------------------------------------------------------

router.get('/genres', async (res,req)=>{

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



module.exports = router;

