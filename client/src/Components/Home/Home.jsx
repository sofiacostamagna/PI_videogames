import React from 'react';
import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { getVideogames, filteredVideogamesByGenres, filteredCreate, orderByName, orderByRating} from '../../redux/actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/Search';


/*-----------------------------------------HOME-----------------------------------------------------------------*/

export default function Home()  {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    
    

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
        <div>
            <Link to='/videogames'>Create Videogame</Link>

            {/* TITULO DE LA PAGINA */}

            <h1>PI VIDEOGAMES</h1>
            <h2>Costamagna Sofia</h2>
            <button onClick={e => {handleClick(e)}}>Load all Videogames</button>

            {/* FILTROS Y ORDENAMIENTO  */}            
         
            <div>
            {/* FILTRO ORDEN ASC Y DESC */}
                <select onChange={e => handleSort(e)}> 
                    <option value='asc'>A-Z</option> {/* value permite acceder al valor q tiene*/}
                    <option value='desc'>Z-A</option>
                </select>
            
            {/* FILTRO POR RATING */}
                <select onChange={e => handleRating(e)}>
                    <option value='asc'>Rating Ascending</option>
                    <option value='desc'>Rating Descending</option>
                </select>

            {/* FILTRO POR GENERO */ }
                <select onChange={event => handleFilteredGenre(event)}> 
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
                <select onChange={e => handleFilteredCreate(e)}>
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


          </div>
        
        {/* RENDERIZACION SEARCHBAR */}
            <SearchBar />
        
         
          {/* RENDERIZADO DE LA CARD  */} 
          {
          
            currentVideogames?.map ((element) => {
                return (
                    <Card name={element.name} image = {element.image} genres= {element.genres} key ={element.id} id = {element.id}/>
                )
               
            })
        }

    </div>
    )
}