//MANEJAMOS EL ESTADO DE LA APLICACION Y SE ENCARGA DE ACTUALIZARLO EN RESPUESTA A DIFERENTES ACCIONES 
//QUE SE ENVIAN A TRAVES DE LA API(action-types).

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    rating: [],
    
};

function rootReducer(state = initialState, action) {
    //Toma el estado actual y una accion a ser realizada -->devuelven un nuevo estado de la aplicación.
    switch (action.type) {
        
        case "GET_VIDEOGAMES":
            return {
                ...state,//crea una copia del estado actual 
                videogames: action.payload, //actualiza el state con la info de VG q recibe por payload
                allVideogames: action.payload //idem
            }
            
            
        case "FILTERED_BY_GENRES":
            return {
                 ...state, //crea una copia del estado actual 
                videogames: state.videogames?.filter((videogame) => //filtra los VG por genero
                videogame.genres?.includes(action.payload)//los que contengan el genero especificado por payload.
                ),
            }
                


        case "FILTERED_BY_ORIGIN":
            if (action.payload === 'default'){
                return {...state, videogames: state.allVideogames}
                }
              
            if(action.payload === 'DB'){
                return {...state, videogames: state.allVideogames.filter((game)=> (typeof game.id) === 'string')}
                }
              
            if(action.payload === 'API'){
                return {...state, videogames: state.allVideogames.filter((game)=> (typeof game.id) === 'number')}
                }
              
            else {
                return {...state, filtered: state.gamesBackUp.filter((game) => {
                    return game.genres.find((genre) => {
                        return genre === action.payload})
                })}
            };
       

                    
        case "ORDER_BY_NAME":
            let orderAZ = state.videogames.slice().sort((a,b) =>{ // crea una copia del array de VG del estado y ordena
            //slice(devuelve un nuevo array de VG para ordenarlos sin modificar el state inicial)
            // sort ordena alfabeticamente de manera asc. 
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0 //objetos mismo name
            })
                return{
                     ...state,
                    videogames: action.payload === 'asc' ? orderAZ : orderAZ.reverse() //actualiza VG depende el valor de payload
                }

                        
        case "GET_VIDEOGAME_BY_NAME":
            return{
                    ...state,
                    videogames:action.payload
                }
                            
        case 'ORDER_BY_RATING':
            let orderAsc = state.videogames.slice().sort((a,b) =>{
                if (Number(a.rating) > Number(b.rating)) return 1;
                if (Number(b.rating) > Number(a.rating)) return -1;
                return 0
            })
            return{
                    ...state,
                    videogames: action.payload === 'desc' ? orderAsc : orderAsc.reverse()
                    }
                                
        case "GET_GENRES":
                return {
                        ...state,
                        genres: action.payload
                    }  

        case "VIDEOGAME_CREATED":
            return{
                    ...state,
                }
                                        
        case "GET_DETAIL":
            return {
                    ...state,
                    detail: action.payload,
                };
                                            
                                            
                                            
                                            
        default:
            return {...state}
           }
         }
                                        
                                        
                                        
    export default rootReducer;
                                        
//Payload-> dato q se envia con una accion para indicar q tipo de action se esta realizando y/o proporcionar
 //necesarios para realizar la accion