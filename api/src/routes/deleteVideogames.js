const { Router } = require('express');
const router = Router();
const { deleteVideogames } = require('../controllers/deleteVideogames');


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const videogame = await deleteVideogames(id);
        res.status(200).json(`the videogame ${videogame.name} was deleted`);

    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
