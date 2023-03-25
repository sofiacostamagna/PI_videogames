import React from 'react';
import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { getVideogames, filteredVideogamesByGenres, filteredCreate, orderByName, orderByRating} from '../../redux/actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/Search';
import styles from './Home.module.css';


/*-----------------------------------------HOME-----------------------------------------------------------------*/

export default function Home()  {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    

/*---------------------------------------PAGINADO---------------------------------------------------------------*/
    //Defino estados locales --> uso useState xq es local.
    const [currentPage, setCurrentPage] = useState(1) //guardo el estado con la pag actual y otro estado que setea la pagina actual
    //arranca en 1 xq la pag actual es 1
    const [videogamesPerPage /*setVideogamesPerPage*/] = useState(15) //setea cuantos VG quiero por pag, el readme pide 15 

    const indexOfLastVideogame = currentPage * videogamesPerPage //(15) es la pag donde estoy * cant de VG por pag-> al principio será 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage //al principio será 0
    
    const currentVideogames = [];
for (let i = indexOfFirstVideogame; i < indexOfLastVideogame && i < allVideogames.length; i++) {
  currentVideogames.push(allVideogames[i]);
}
    //const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) //Tiene los VG de la pag actual
    //slice agarra un arreglo y me toma la porción de lo que yo estoy pasando por parametro: el indice del primer VG y el del ultimo. 
    
    const paginado = (pageNumber) => { //Le paso el n de pag
        setCurrentPage(pageNumber) //seteo la pag en el n de pag que pase.
    }
/*----------------------------------- FILTRADO -----------------------------------------------------------------------------*/
   
    useEffect(() => {  
        dispatch(getVideogames());
    },[])

   //MUESTRA TODOS LOS VIDEOGAMES:
   function handleClick(e) {
        e.preventDefault(); //se usa para no recargue la página por el useEffect.
        dispatch(getVideogames());
    }

    // POR GENERO:
     const handleFilteredGenre=(e)=>{ 
        dispatch(filteredVideogamesByGenres(e.target.value));
    }
    
    //POR COMO FUERON CREADOS:
    const handleFilteredCreate=(e)=>{ 
        dispatch(filteredCreate(e.target.value));
    }

    // POR NOMBRE:
    const [orden, setOrden] = useState('')
      function handleSort(e){ 
        e.preventDefault(); // creo un estado vacio local que arranca vacio
        dispatch(orderByName(e.target.value))

        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)// aca lo seteo ordenado 
    };

    //POR RATING:
    const [orderRating, setRating]= useState('');
    function handleRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);

        setRating(e.target.value);
        setOrden("Order" + e.target.value);
    }
        

    return (
        <div className={styles.fondo}> {/*estilo fondo */}

        <div className={styles.barraSup}>{/*estilos barra superios*/}

        {/* TITULO DE LA PAGINA */}
           
        <h1 className={styles.titulo}>I 🤍 VIDEOGAMES </h1> 

        {/* RECARGA VIDEOJUEGOS */}
        <Link>
        <button className={styles.botonAll} onClick={e => {handleClick(e)}}>LOAD ALL VIDEOGAMES</button>
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

                {/* OTRO OPCION NOSE SI FUNCIONA 
                <select onChange={e => handleFilteredGenre(e)}> {/* filtrar por género  */}
                    {/*<option value='All' key='unique1'>All</option>
                    {allGenres.map((el) => {
                        return (
                            <option value={el.name} key={el.id}>{el.name}</option>
                            )
                        })}                   
                    </select> */} 
            
        {/* FILTRO POR ORIGEN API O DB */}
        <select className={styles.selector1} onChange={e => handleFilteredCreate(e)}>
        <option value=''>CREATE</option>
        <option value='DB'>CREATE BY DB</option>
         <option value='Api'>CREATE BY API</option>
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
         {/* RENDERIZACION PAGINADO */}
         <Paginado 
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}                
                /> 
                <p className={styles.page}></p>  
                </div>
                </div>
    );
}   