import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getVideogameByName} from '../../redux/actions/actions';



/*
//export default 


function SearchBar({onSearch}) { // porps es un objeto por lo que puedo hacer destructing
  const [character, setCharacter] = useState('') // este es el dato inicial, un string vacio

 
  const handleChange = (event) => { // recibe por paramento el event cuando pasa onChange
     setCharacter(event.target.value) // la funcion se encarga de modificar con lo que pide el usuario a mi character, aca no me hago una copia
  }

  const handleReset = ()=>{
   setCharacter('');
  }

   return (
      <div>
      <input className={style.button} type='search' value={character} onChange={handleChange} />
      <button className={style.button} onClick={() => {
         onSearch(character) 
         handleReset()}}
       >Agregar</button> 
      </div>
   ); // para pasar paramentro a una funcion dentro de un onChange u onClick lo realizo con una cb

}
export default SearchBar;*/

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)    
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getVideogameByName(name))

    }

    return (
        <div>
            <input
            type= 'text'
            placeholder="Search..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button
            type="submit"
            onClick = {(e)=> handleSubmit(e)}
            >Search</button>
        </div>
    )
}