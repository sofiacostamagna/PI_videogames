import React from 'react';
import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { getVideogames, filteredVideogamesByGenres, filteredCreate, orderByName, getGenres} from '../../redux/actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/Search';


/*-----------------------------------------HOME-----------------------------------------------------------------*/

export default function Home()  {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state)=> state.genres)
    

    

/*---------------------------------------PAGINADO---------------------------------------------------------------*/
    //Defino estados locales --> uso useState xq es local.
    const [currentPage, setCurrentPage] = useState(1) //guardo el estado con la pag actual y otro estado que setea la pagina actual
    //arranca en 1 xq la pag actual es 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15) //setea cuantos VG quiero por pag, el readme pide 15 

    const indexOfLastVideogame = currentPage * videogamesPerPage //es la pag donde estoy * cant de VG por pag-> al principio será 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage //al principio será 0
    
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) //Tiene los VG de la pag actual
    //slice agarra un arreglo y me toma la porción de lo que yo estoy pasando por parametro: el indice del primer VG y el del ultimo. 

    const paginado = (pageNumber) => { //Le paso el n de pag
        setCurrentPage(pageNumber) //seteo la pag en el n de pag que pase.
    }
 /*-------------------------------------------------------------------------------------------------------------------------*/
    useEffect(() => {  
        dispatch(getVideogames());
    },[])

/*----------------------------------BONTON----------------------------------------------------------------------------------*/
   function handleClick(e) {
        e.preventDefault(); //ponerlo para que no se nos recargue la página por el useEffect! 
        dispatch(getVideogames());
    }
/*----------------------------------- FILTRADO -----------------------------------------------------------------------------*/
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

    return (
        <div>
            <Link to='/videogames'>Create Videogame</Link>

            {/* TITULO DE LA PAGINA */}

            <h1>PI VIDEOGAMES</h1>
            <button onClick={e => {handleClick(e)}}>Volver a cargar los Videogames</button>

            {/* FILTROS Y ORDENAMIENTO  */}            
            <div>  
                <select onChange={e => handleSort(e)}> {/* ordenar ascendente/descendente  */}
                    <option value='rating'>Rating</option> 
                    <option value='asc'>A-Z</option> {/* value permite acceder al valor q tiene*/}
                    <option value='desc'>Z-A</option>
                </select>

                <select onChange={event => handleFilteredGenre(event)}> {/* filtrar por género  */}
                    <option value='All'>All Genres</option>
                    <option value='Action'>Action</option>
                    <option value='Indie'>Indie</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='RPG'>RPG</option>
                    <option value='Strategy'>Strategy</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Casual'>Casual</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Racing'>Racing</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Sports'>Sports</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Family'>Family</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Educational'>Educational</option>
                    <option value='Card'>Card</option>                    
                </select>
                {/*<select onChange={e => handleFilteredGenre(e)}> {/* filtrar por género  */}
                    {/*<option value='All' key='unique1'>All</option>
                    {allGenres.map((el) => {
                        return (
                            <option value={el.name} key={el.id}>{el.name}</option>
                        )
                    })}                   
                </select> */} 

                <select onChange={e => handleFilteredCreate(e)}> {/* filtrar por origen: api o bbd  */}
                    <option value='All'>All</option>
                    <option value='DB'>DB Games</option>
                    <option value='Api'>API Games</option>
                </select>  


                {/* RENDERIZACION PAGINADO */}
                <Paginado 
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}                
                />        



            <SearchBar />
        
         {/* RENDERIZADO DE LA CARD  */} 
         
         { 
            currentVideogames?.map ((c, index) => {
                return (
                    <li key = {index} >
                    <Link to={'/videogame/' + c.id}>
                    <Card name={c.name} image = {c.image} genres= {c.genres} key ={c.id}/>
                    </Link>
                    </li>
                    )
                    
                })
            } 
        </div>

    </div>
    )
}

