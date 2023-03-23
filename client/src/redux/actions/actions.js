import axios from 'axios'; 
import { GET_VIDEOGAMES, FILTERED_BY_GENRES, FILTERED_CREATE , ORDER_BY_NAME, GET_VIDEOGAME_BY_NAME, GET_GENRES, GET_DETAIL_PAGE, ORDER_BY_RATING } from '../actions/action-types'


/*------------------------TRAE TODOS LOS VIDEOJUEGOS -----------------------------------
ACA SE CONECTA EL FRONT CON EL BACK */
export function getVideogames(){ 
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

//ACTION QUE TRAE VIDEOGAMES FILTRADOS POR GENERO
export function filteredVideogamesByGenres(payload){ 
    return {
        type: FILTERED_BY_GENRES,
        payload
    }
}

//ACTION QUE TRAE VIDEOGAMES SEGUN FUERON CREADOS EN BDD O DE LA API
export function filteredCreate(payload){ 
    return {
        type: FILTERED_CREATE,
        payload
    }
}
 
//ACTION QUE ORDENA VIDEOGAMES POR NOMBRE
export  function orderByName(payload){ 
  return{
      type: ORDER_BY_NAME,
      payload
  }
}

//ACTION QUE ORDENA VIDEOGAMES POR RATING 
export  function orderByRating(payload){ 
  return{
      type: ORDER_BY_RATING,
      payload
  }
}

//ACTION QUE TRAE EL VIDEOGAME BUSCADO POR NOMBRE
export function getVideogameByName(name){ 
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

//ACTION QUE TRAE EL ARRAY DE GENEROS 
export function getGenres() {  
  return async function (dispatch){
      let info = await axios.get("http://localhost:3001/genres", {
      })
      return dispatch({
          type: GET_GENRES,
          payload: info.data
      })
    }
  }

  //ACTION POST- CREA VIDEOGAMES
  export function postVideogame (payload) {
    return async function(dispatch){
      let response= await axios.post("http://localhost:3001/videogames", payload);
       return response;
    }
  }

  //ACTION QUE MUESTRA LOS DETLLES EN LAS CARTAS
  export function getDetailPage(payload){
    return async function(dispatch){
      try{
        let json = await axios.get(`http://localhost:3001/videogames/${payload}`);
        return dispatch({
          type: GET_DETAIL_PAGE ,
          payload: json.data
        })
      }catch (error){
        console.log(error)
      }
    }

    }

  






