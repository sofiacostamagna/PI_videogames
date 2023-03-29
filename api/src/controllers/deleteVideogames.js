const { Videogame } = require('../db');

const deleteVideogames = async (id) => {

 if(!id) {
  throw new Error ('This Videogame does not exist') 

 } else if(typeof id === 'number') throw new Error ('You can not erase this game')

  const foundVideogame = await Videogame.findByPk(id)

  foundVideogame.destroy({
    where: { id: id }
   })
   return foundVideogame;
}

module.exports = {deleteVideogames};

