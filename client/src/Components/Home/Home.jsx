import React from 'react';
import { useState, useEffect } from 'react'; //hooks que maneja el estado en la api
import { useDispatch, useSelector } from 'react-redux'; //hooks maneja el estados en la api
import { getVideogames, filteredVideogamesByGenres, orderByName, orderByRating, filteredByOrigin} from '../../redux/actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/Search';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';


/*-----------------------------------------HOME-----------------------------------------------------------------*/

export default function Home()  {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)
    

/*---------------------------------------PAGINADO---------------------------------------------------------------*/
    //Defino estados locales --> uso useState xq es local.
    const [currentPage, setCurrentPage] = useState(1) //guardo el estado con la pag actual y otro estado que setea la pagina actual
    //arranca en 1 xq la pag actual es 1
    const [videogamesPerPage /*setVideogamesPerPage*/] = useState(15) //setea cuantos VG quiero por pag, el readme pide 15 

    //calculamos el indice del primer y ultimo VG q vamos a mostrar por pagina:
    const indexOfLastVideogame = currentPage * videogamesPerPage //(15) es la pag donde estoy * cant de VG por pag-> al principio será 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage //al principio será 0
    
    const currentVideogames = [];//almacenamos los VG q se van a mostrar por pag actual
    for (let i = indexOfFirstVideogame; i < indexOfLastVideogame && i < allVideogames.length; i++) {
    currentVideogames.push(allVideogames[i]); //iterea desde el First hasta el Last y agrega cada VG del arreglo al const allVG
   }
    
    const paginado = (pageNumber) => { //Le paso el n de pag
        setCurrentPage(pageNumber) //seteo la pag en el n de pag que pase.
    }
/*----------------------------------- FILTRADO -----------------------------------------------------------------------------*/
   
    useEffect(() => {  
        dispatch(getVideogames());
    },[])

   //MUESTRA TODOS LOS VIDEOGAMES:
   function handleClick(e) {
        e.preventDefault(); //para evitar la accion predeterminada del e(la recarga de la pag x el useEffect)
        //que se recargue la pag y se pierda lo que hiso el usuario
        dispatch(getVideogames());
    }

    // POR GENERO:
     const handleFilteredGenre=(e)=>{ 
        dispatch(filteredVideogamesByGenres(e.target.value));
    }
    
    //POR COMO FUERON CREADOS:
    function handleFilteredByOrigin(event){ 
        dispatch(filteredByOrigin(event.target.value))//toma el valor del elemento seleccionado y llama a la funcion filteredByOrigin
        //con este valor como argumento para q filtre x el elemento seleccionado
    }

    // POR NOMBRE:
    const [orden, setOrden] = useState('')
      function handleSort(e){ //recibe un e y sera llamado cuando seleccione una opcin de orden
        e.preventDefault(); // creo un estado vacio local que arranca vacio
        dispatch(orderByName(e.target.value))

        //actualiza los estados locales de currentPage y orden
        setCurrentPage(1);//vuelve a la primera pag para ver los resultados de la busquedad actualizado
        setOrden(`Ordenado ${e.target.value}`)// aca lo seteo ordenado  concatenando con el value seleccionado
    };

    //POR RATING:
    const [orderRating, setRating]= useState('');
    function handleRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))//pasamos e valor seleccionado 

        //actualiza los estados locales
        setCurrentPage(1);//actualizo el valor currentPage a 1->con resultados actualizado
        setRating(e.target.value);
        setOrden("Order" + e.target.value);
    }
        

    return (
        <div className={styles.fondo}> {/*estilo fondo */}

        <div className={styles.barraSup}>{/*estilos barra superios*/}

        {/* TITULO DE LA PAGINA */}
           
        <h1 className={styles.titulo}>I 🤍 VIDEOGAMES </h1> 

        {/* RECARGA VIDEOJUEGOS */}
        <Link to='/home'>
        <button className={styles.botonAll} onClick={e => {handleClick(e)}}>ALL VIDEOGAMES</button>
        </Link>

         {/* CREA VIDEOGAMES */}  

         <Link to='/videogame'> 
        <button className={styles.botonAll}>CREATE NEW VIDEOGAME</button>
        </Link>

            
        {/* FILTROS Y ORDENAMIENTO  */}            
         
        {/* FILTRO ORDEN ASC Y DESC */}
        <select className={styles.selector} onChange={e => handleSort(e)}> 
        <option value='asc'>A-Z</option> {/* value permite acceder al valor q tiene*/}
        <option value='desc'>Z-A</option>
        </select>
            
        {/* FILTRO POR RATING */}
        <select className={styles.selector} onChange={e => handleRating(e)}>
        <option value=''>RATING</option>
        <option value='asc'>ASC</option>
        <option value='desc'>DESC</option>
        </select>

        {/* FILTRO POR GENERO */ }
        <select className={styles.selector1} onChange={event => handleFilteredGenre(event)}> 
        <option value='All'>ALL GENRES</option>
        <option value='Action'>ACTION</option>
        <option value='Indie'>INDIE</option>
        <option value='Adventure'>ADVENTURE</option>
        <option value='RPG'>RPG</option>
        <option value='Strategy'>STRATEGY</option>
        <option value='Shooter'>SHOOTER</option>
        <option value='Casual'>CASUAL</option>
        <option value='Simulation'>SIMULATION</option>
        <option value='Puzzle'>PUZZLE</option>
        <option value='Arcade'>ARCADE</option>
        <option value='Platformer'>PLATFORMER</option>
        <option value='Racing'>RACING</option>
        <option value='Massively Multiplayer'>Massively Multiplayer</option>
        <option value='Sports'>SPORTS</option>
        <option value='Fighting'>FIGHTING</option>
        <option value='Family'>FAMILY</option>
        <option value='Board Games'>BOARD GAMES</option>
         <option value='Educational'>EDUCATIONAL</option>
        <option value='Card'>CARD</option>                    
        </select>

            
        {/* FILTRO POR ORIGEN API O DB */}
          
        <select  onChange={event => handleFilteredByOrigin(event)}> {/* filtrar por origen: api o bbd  */}
                                    <option  value=''>CREATOR ▼</option>
                                    <option value='all'>All</option>
                                    <option value='database'>Created by you</option>
                                    <option value='all'>Our DataBase</option>
                                </select> 

        </div>

        <div>
            

        {/* RENDERIZACION SEARCHBAR */}
        <SearchBar />
            
        {/* DETALLE DE CARTA */}  

          <div className={styles.card_contenedor}>
        
          { currentVideogames?.map ((element) => {
              return (
                  <div className={styles.card_contenedor}>
                    <Card 
                    name={element.name} 
                    image = {element.image} 
                    genres= {element.genres} 
                    rating={element.rating}
                    key ={element.id} 
                    id = {element.id}
                    />
               </div>
    
                );
            })
        }
        </div>

        <div>
            <Footer />
        </div>
         {/* RENDERIZACION PAGINADO */}
         <Paginado 
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}                
                /> 
                <p className={styles.page}></p> 

        
       
        </div>           
     </div>
    );
}   