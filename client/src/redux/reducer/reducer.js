//MANEJAMOS EL ESTADO DE LA APLICACION Y SE ENCARGA DE ACTUALIZARLO EN RESPUESTA A DIFERENTES ACCIONES 
//QUE SE ENVIAN A TRAVES DE LA API(action-types).

import { GET_VIDEOGAMES, 
         GET_VIDEOGAME_BY_NAME,
         GET_GENRES, 
         GET_DETAIL,
         FILTERED_BY_GENRES, 
         FILTERED_BY_ORIGIN, 
         POST_VIDEOGAME, 
         ORDER_BY_NAME, 
         ORDER_BY_RATING ,
    } from '../actions/action-types'

    const initialState = {
        videogames: [],
        allVideogames: [],
        genres: [],
        detail: []
    };
    
    function rootReducer(state = initialState, action) {
        //Toma el estado actual y una accion a ser realizada -->devuelven un nuevo estado de la aplicación.
        switch (action.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,//crea una copia del estado actual 
                videogames: action.payload, //actualiza el state con la info de VG q recibe por payload
                allVideogames: action.payload //idem
            }
            

        case FILTERED_BY_GENRES:
          return {
            ...state, //crea una copia del estado actual 
            videogames: state.videogames?.filter((juego) => //filtra los VG por genero
              juego.genres?.includes(action.payload)//los que contengan el genero especificado por payload.
            ),
          }

			
        case FILTERED_BY_ORIGIN:
            const allVideogames2= state.allVideogames; //obtenemos la lista completa de todos los VG
            const filteredVideogames= allVideogames2.filter((el)=> action.payload === 'created' ? el.createInDb : !el.createInDb);
            //comprobamos si el valaro de action.payload es created o no
             return{
                ...state,
                videogames: filteredVideogames// actualiza el estado
            }

             
            case ORDER_BY_NAME:

            let orderAZ = state.videogames.slice().sort((a,b) =>{
            if (a.name > b.name) return 1;
            if (b.name > a.name) return -1;
            return 0
        })
            return{
            ...state,
            videogames: action.payload === 'asc' ? orderAZ : orderAZ.reverse()
        }

        case GET_VIDEOGAME_BY_NAME:
                return{
                    ...state,
                    videogames:action.payload
                }
        
        case ORDER_BY_RATING:
                let orderAsc = state.allVideogames.slice().sort((a,b)=>{
                    if (Number(a.rating) > Number(b.rating)) return 1;
                    if (Number(b.rating) > Number (a.rating)) return -1;
                    return 0
                })
                return{
                    ...state,
                    videogames: action.payload === 'desc' ? orderAsc : orderAsc.reverse()
                }

            case GET_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }  
            case POST_VIDEOGAME:
                return{
                    ...state,
                }
            
            case GET_DETAIL:
                return {
                  ...state,
                  detail: action.payload,
              };



    
        default:
            return {...state}
    }
}



export default rootReducer;
