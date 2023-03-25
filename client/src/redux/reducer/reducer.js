import { GET_VIDEOGAMES, FILTERED_BY_GENRES, FILTERED_CREATE, ORDER_BY_NAME, GET_VIDEOGAME_BY_NAME, GET_GENRES, POST_VIDEOGAME, GET_DETAIL_PAGE, ORDER_BY_RATING } from '../actions/action-types'

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: []
};

function rootReducer(state = initialState, action) {
//Toma el estado actual y una accion -->devuelven un nuevo estado de la aplicación, actualiza el estado
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
            

        case FILTERED_BY_GENRES:
                /*const allVideogames = state.allVideogames;
                const filteredGenre = action.payload === 'All'? allVideogames : allVideogames.filter((videogame) => videogame.genres?.find(v => v === action.payload));
            
                
                return {
                    ...state,
                    videogames: filteredGenre
                }
           //return {
            //...state,
            //filteredVideogames: action.payload.videogameGenre,
            //filterBy: action.payload.genre,
          //}*/
          return {
            ...state,
            videogames: state.videogames?.filter((juego) =>
              juego.genres?.includes(action.payload)
            ),
          }

			

        case FILTERED_CREATE:
            const allVideogames2= state.allVideogames;
            const createdFilter = action.payload === 'database' ?  allVideogames2.filter((element) => element.createdInDb) : allVideogames2.find((element) => !element.createdInDb)
            return {
                ...state,
                videogames: action.payload === 'all' ? state.allVideogames : createdFilter
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
            case GET_DETAIL_PAGE:
                /*return{
                    ...state,
                    detail: action.payload
                }*/
                return {
                    ...state,
                    detail: action.payload,
                  };

    
        default:
            return {...state}
    }
}



export default rootReducer;
