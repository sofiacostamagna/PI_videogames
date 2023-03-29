//MANEJAMOS EL ESTADO DE LA APLICACION Y SE ENCARGA DE ACTUALIZARLO EN RESPUESTA A DIFERENTES ACCIONES 
//QUE SE ENVIAN A TRAVES DE LA API(action-types).

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    
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
                videogames: state.videogames?.filter((juego) => //filtra los VG por genero
                juego.genres?.includes(action.payload)//los que contengan el genero especificado por payload.
                ),
            }
                
                
                /*case FILTERED_BY_ORIGIN:
                const allVideogames2= state.allVideogames; //obtenemos la lista completa de todos los VG
                //const filteredVideogames= allVideogames2.filter((el)=> el === 'DB' ? el.createInDb : !el.createInDb);
                const filteredVideogames = action.payload ==='DB' ? allVideogames2.filter((el)=> el.createInDb) :
                allVideogames2.filter((el)=> !el.createInDb)
                //comprobamos si el valaro de action.payload es created o no
                console.log(filteredVideogames)
                return{
                    ...state,
                    videogames: action.payload === 'all' ? state.allVideogames2 : filteredVideogames// actualiza el estado
                }*/
                
                /*case FILTERED_BY_ORIGIN:
                const allVideogames2 = state.allVideogames;
                const filteredVideogames = action.payload === 'DB' 
                ? allVideogames2.filter((el) => el.createInDb === true) 
                : allVideogames2.filter((el) => el.createInDb === false);
                return {
                    ...state,
                    videogames: action.payload === 'all' ? state.allVideogames : filteredVideogames
                }*/
                
        /*case "FILTERED_BY_ORIGIN":
            const allVideogames1 = state.allVideogames;
            const filteredVideogames = allVideogames1.filter((el) => action.payload === 'created' ? el.createInDb : !el.createInDb);
                return {
                    ...state,
                    allVideogames: filteredVideogames
                };*/
                    
                    /*case FILTERED_BY_ORIGIN:
                    const allVideogames = state.allVideogames;    
                    const orderCreate = 
                    action.payload === 'created' 
                    ? state.allVideogames.filter((el) => el.createdInDb) 
                    : state.allVideogames.filter((el) => !el.createdInDb)
                    return{
                        ...state,
                        videogames: action.payload === 'all' ? allVideogames : orderCreate
                    }*/

        case "FILTERED_BY_ORIGIN":
            const allVideogames2 = state.allVideogames;
            const originFilter = action.payload === 'database' ?  allVideogames2.filter((element) => element.createInDb) : allVideogames2.filter((element) => !element.createInDb)
            console.log(action.payload)
                return {
                     ...state,
                    videogames: action.payload === 'all' ? state.allVideogames : originFilter
                }
                    
                    
                    
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
                            
        case "ORDER_BY_RATING":
            let orderAsc = state.allVideogames.slice().sort((a,b)=>{ //creamos una copia del VG original-> 
                //ordena segun rating->se espera q sea un N
                if (Number(a.rating) > Number(b.rating)) return 1;//si es mayor
                if (Number(b.rating) > Number (a.rating)) return -1;//si es menor
                return 0//si son iguales
            })
                return{
                    ...state,
                     videogames: action.payload === 'desc' ? orderAsc : orderAsc.reverse()
                } //si payload es = desc ->devuelve una copia ordenada de los obj de VG
                //si payload es = asc -> copia ordenada en reversa
                                
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