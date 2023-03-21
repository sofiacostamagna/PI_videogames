import { GET_VIDEOGAMES, FILTERED_BY_GENRES, FILTERED_CREATE, ORDER_BY_NAME, GET_VIDEOGAME_BY_NAME, GET_GENRES } from '../actions/action-types'

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: []
};

function rootReducer(state = initialState, action) {
//Toma el estado actual y una accio -->devuelven un nuevo estado de la aplicación, actualiza el estado
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
            

        case FILTERED_BY_GENRES:
            const allVideogames = state.allVideogames
            const filteredGenre = action.payload === 'All'? allVideogames : allVideogames.filter((videogame) => videogame.genres?.find(v => v === action.payload));
            return {
                ...state,
                videogames: filteredGenre
            }

        case FILTERED_CREATE:
            const allVideogames2= state.allVideogames;
            const createdFilter = action.payload === 'Created' ?  allVideogames2.filter((element) => element.createdInDb) : allVideogames2.filter((element) => !element.createdInDb)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }
        
        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ? 
            state.characters.sort(function (a,b){ //sort ordena lista de elementos, lo ubica antes o despues del arreglo depende si son  + grande o + chico
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort(function (a, b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;

            })
            return {
                ...state,
                videogamas: sortedArr
            }

            case GET_VIDEOGAME_BY_NAME:
                return{
                    ...state,
                    genres:action.payload
                }

            case GET_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }  

    
        default:
            return {...state}
    }
}


export default rootReducer;
