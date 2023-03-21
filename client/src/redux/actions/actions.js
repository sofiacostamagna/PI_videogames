import axios from 'axios'; 
import { GET_VIDEOGAMES, FILTERED_BY_GENRES, FILTERED_CREATE , ORDER_BY_NAME, GET_VIDEOGAME_BY_NAME, GET_GENRES } from '../actions/action-types'


/*------------------------TRAE TODOS LOS VIDEOJUEGOS -----------------------------------
ACA SE CONECTA EL FRONT CON EL BACK */
export const getVideogames = () => { 
    return async function (dispatch){ //lo hago con async await pero se puede hacer con promesas tmb, hacer uno para practicar ! 
        let json = await axios.get("http://localhost:3001/videogames", {  //esta es la ruta que hice en el back que me trae TODOS los videojuegos.
        })
        return dispatch({
            type: GET_VIDEOGAMES,
            payload:json.data
        })
    }
}
/* PROMESA:
export const getVideogames = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3001/videogames")
      .then((response) => {
        resolve({
          type: GET_VIDEOGAMES,
          payload: response.data,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}; */


export function filteredVideogamesByGenres(payload){ //ACTION QUE TRAE VIDEOGAMES FILTRADOS POR GENERO
    return {
        type: FILTERED_BY_GENRES,
        payload
    }
}


export function filteredCreate(payload){ //ACTION QUE TRAE VIDEOGAMES SEGUN FUERON CREADOS EN BDD O DE LA API
    return {
        type: FILTERED_CREATE,
        payload
    }
}
 
export const orderByName = (payload) => { //ACTION QUE ORDENA VIDEOGAMES POR NOMBRE
  return{
      type: ORDER_BY_NAME,
      payload
  }
}


export const getVideogameByName = (name) => { //ACTION QUE TRAE EL VIDEOGAME BUSCADO POR NOMBRE
  return async function (dispatch){
      try {
          let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
          return dispatch({
              type: GET_VIDEOGAME_BY_NAME,
              payload: json.data
          })
      } catch (error) {
          console.log(error);
      }
  }
}

export const getGenres = () => {  //ACTION QUE TRAE EL ARRAY DE GENEROS
  return async function (dispatch){
      let info = await axios.get(`http://localhost:3001/genres`, {
      })
      return dispatch({
          type: GET_GENRES,
          payload: info.data
      })
    }
  }





