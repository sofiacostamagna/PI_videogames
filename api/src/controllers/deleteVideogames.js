//import { where } from "sequelize";

/*const { Videogame } = require("../db");


export async function deleteVideogames(id){
    if(!id){
        throw new Error('no existe ID')
    } else if(typeof id === 'number') throw new Error('no se puedo borrar')
   
    const videogamesToDelete = await Videogame.findByPk(id)
   //return videogamesDb

   Videogame.destroy({
    where:{
        id: id
    }
   })
 
   return  videogamesToDelete;
} */

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

