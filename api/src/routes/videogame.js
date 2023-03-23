require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js')
const router = Router();


// Obtengo el detalle de un videogame en particular por ID
router.get('/:id', async function (req, res) {
    const { id } = req.params; // es lo mismo hacer  const id = req.params.id;

    try { 
        if (id.includes("-")) {
            const gameDB = await Videogame.findOne({ where: {id},
                include: {model: Genre, attributes: ['name'],
                through: {attributes: []}}})
                let videogame = gameDB
                const information = {
                    id: videogame.id,
                    name: videogame.name,
                    description: videogame.description,
                    platforms: videogame.platforms,
                    image: videogame.image,
                    relDate: videogame.released,
                    rating: videogame.rating,
                    genres: videogame.genres.map(p => p.name).join(', ')
                }
                return res.json(information)
        } else {
            const gameAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                    
                let X = gameAPI.data;
                const information = {
                    id: X.id,
                    name: X.name,
                    image: X.background_image,
                    genres: X.genres && X.genres.map((p) =>
                        p.name).filter(p => p != null).join(', '),
                    description: X.description_raw,
                    relDate: X.released,
                    rating: X.rating,
                    platforms: X.platforms && X.platforms.map((p) =>
                        p.platform.name).filter(p => p != null).join(', ')
                }
                return res.json(information)
        }
    } catch (err) {
        res.status(404).json({ error: "ID not found" })
    }
})


module.exports = router;



