import axios from 'axios'; 
import { GET_VIDEOGAMES, 
         GET_VIDEOGAME_BY_NAME, 
         GET_DETAIL, 
         GET_GENRES, 
         FILTERED_BY_GENRES, 
         FILTERED_BY_ORIGIN, 
         ORDER_BY_RATING, 
         ORDER_BY_NAME, 
         VIDEOGAME_CREATED,
        } from '../actions/action-types'



//---------------------------------ACA SE CONECTA EL FRONT CON EL BACK -----------------------------------------

//ACTION QUE TRAE TODOS LOS VIDEOGAMES:
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


//ACTION QUE TRAE VIDEOGAMES FILTRADOS POR GENERO
export function filteredVideogamesByGenres(payload){ 
    return {
        type: FILTERED_BY_GENRES,
        payload
    }
}


//ACTION QUE TRAE VIDEOGAMES SEGUN FUERON CREADOS EN BDD O DE LA API

export function filteredByOrigin(order) {
  return function (dispatch) {
    dispatch({ type: FILTERED_BY_ORIGIN, payload: order });
  };
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
};


//ACTION QUE TRAE EL VIDEOGAME BUSCADO POR NOMBRE
export function getVideogameByName(name){ //definimos la funcion q toma un parametro name->q queremos buscar
  return async function (dispatch){//retorna una funcion asincrona ->toma un parametro dispatch-> envia la accion
      try {
          let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)//ruta del back busca el name y lo guarda en let
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
      let info = await axios.get("http://localhost:3001/genres", {//peticion al back y guardamos la info en el let
      })
      return dispatch({
          type: GET_GENRES,
          payload: info.data
      })
    }
  }

  //ACTION POST- CREA VIDEOGAMES
export function postVideogame (payload) {// payload contiene la info necesario para crear el VG
  return async function(dispatch){
    try {
      let response = await axios.post("http://localhost:3001/videogames", payload);//solicitud al back y guardo la info en let
      //el payload se envia junto con la solicitud para crea un nuevo VG en el servidor.
      let videogame = response.data; // Obtener el objeto de videojuego creado en el servidor
      
      dispatch({
        type: VIDEOGAME_CREATED,
        payload: videogame//contiene en nuevo VG creado
      });
        return videogame; // Devolver el objeto del videojuego creado para otras operaciones
    } catch (error) {
      console.log(error);
    }
  }
}


  //ACTION QUE MUESTRA LOS DETALLES EN LAS CARTAS
  export const getDetail = (payload) => { //payload es el ID del VG q quiero obtener
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogames/${payload}`)//solicitud al back, guardo la info en let
            return dispatch({
               type: GET_DETAIL,
               payload: json.data//son los datos del VG
        
            })
        } catch (error) {
            console.log(error);
        }
    }
}
    
//DISPATCH -> Es una funcion de redux q se utiliza para enviar acciones al store de la aplicacion.
  



  






