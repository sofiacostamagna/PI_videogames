/*import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getVideogameByName} from '../../redux/actions/actions';
import styles from './Search.module.css';

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
        <div className={styles.body}>
            <div className={styles.box}>
            <form>
            <input
            type= 'text'
            className={styles.input}
            placeholder="Search..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button className={styles.box}
            type="submit"
            onClick = {(e)=> handleSubmit(e)}
            >Search</button>
         </form>
        </div>
        </div>
    
    )
}
*/
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getVideogameByName} from '../../redux/actions/actions';
import styles from './Search.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Debe ingresar un nombre");
    } else {
      dispatch(getVideogameByName(name));
      setName("");
      document.getElementById("search").value = "";
    }
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        id="search"
        type="text"
        placeholder="  Type here..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className={styles.boton}type="submit" onClick={(e) => handleSubmit(e)}>
        SEARCH🔎
      </button>
    </div>
  );
}