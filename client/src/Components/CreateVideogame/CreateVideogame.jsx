import React from 'react';
import {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postVideogame, getGenres, getVideogames} from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";
import styles from './Create.module.css';



//--------------------------------------VALIDACION---------------------------------------------------
function validater(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) { //expresion regular (solo letras y espacios)
    errors.name = "Name should only contain letters and spaces";
  }

  if (!input.description || input.description.trim().length === 0) {
    errors.description = "Description is required";
  }
    
  if (!input.released) {
    errors.released = "Released date is required";
  } else if (
    !/^\d{4}-\d{2}-\d{2}$/.test(input.released) || //valida el formato de fecha y compara la fecha ingresada con la actual, para q no sea futuro
    new Date(input.released) > new Date()
  ) {
    errors.released = "Invalid date format or date is in the future";
  }
  

  if (!input.image) {
    errors.image = "Image is required";
  }

  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (!/^\d+$/.test(input.rating) || input.rating < 0 || input.rating > 10) { //solo obtenga digitos y q el valor este en el rango de 0 a 10
    errors.rating = "Rating should be a number between 0 and 10";
  }

  if (!input.platforms) {
    errors.platforms = "Select one or more platforms";
  }

  if (!input.genres) {
    errors.genres = "Select one or more genres";
  }


  return errors;
}


//--------------------------------------------CREATE VIDEOGAME---------------------------------------------------------


export default function CreateVideogame(){
  //ESTADOS LOCAL:
  const dispatch = useDispatch();
  const genres = useSelector((state)=> state.genres);
  const history= useHistory() // es un metodo que te redirige a la ruta que le diga
  const [errors, setErrors]= useState({});


    const platformsArr = ["PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
    "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"]
    

    //PARA CREAR MI PERSONAJE TENGO QUE TENER MI FORMULARIO QUE LO GUARDO EN UN ESTADO
  const [input, setInput]= useState({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        platforms: [],
        genres: [],

    })

  function handleChange(e){ // hay que pasarle a todos lo input
        setInput({
            ...input,
            [e.target.name] : e.target.value // toma algun input y va a modificar con el valor que le pasamos
        })
        setErrors(validater({// seteame mi  estado errores pasando la funcion value, con el estado input, el target name y target value.
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
          ...input,
          genres: input.genres.includes(e.target.value)
            ? input.genres
            : [...input.genres, e.target.value],
        });
      }
    
    function handleSelect2(e) {
        setInput({
          ...input,
          platforms: input.platforms.includes(e.target.value)
            ? input.platforms
            : [...input.platforms, e.target.value],
        });
      }


    //valida si los campos requeridos se completaron 
    async function handleSubmit(event) {
        event.preventDefault();

        if(Object.keys(errors).length > 0){ //si hay algun campo que esta vacio, envia un error
          alert('All fields are required to be filled in correctly')
          return;
        }
      
        try { //si esta completo crea un VG
            const response = await dispatch(postVideogame(input));
            console.log(response);
            alert('Videogame Created!');
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                platforms: [],
                image: '',
                genres: [],
            });
            history.push('/home'); //y vuelve a la pag incial (home)
        } catch (error) {

            console.error(error);
            alert('Error creating videogame');//sino tira un error
        }
    }
    
    function handleDelete(e) {
        setInput({
          ...input,
          genres: input.genres.filter((el) => el !== e),
        });
      }
    

      function handleDelete2(e) {
        setInput({
          ...input,
          platforms: input.platforms.filter((el) => el !== e),
        });
      }

    useEffect(()=>{
        dispatch (getGenres());
        dispatch(getVideogames());
    }, [dispatch]);

    //------------------------------------------FORMULARIO ------------------------------------------------------------

    return(
        <div className={styles.fondo}>
            <div className={styles.contenedorC}>
            <h1 className={styles.tituloC}>CREATE YOUR VIDEOGAMES</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                
                {/*NAME*/}
                <div className={styles.itemF}>
                    <label className={styles.labelF}>Name: </label>
                    <br></br>
                    <input className={styles.inputF}
                    type='text'
                    value={input.name}
                    name= 'name'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && ( // si esta  mi estado error.name--> seteame un p con ese error
                        <p className={styles.error}>{errors.name}</p>
                        )}
                </div>
                 
                {/*DESCRIPTION*/}
                <div className={styles.itemF}>
                    <label className={styles.labelF}>Description: </label>
                    <br></br>
                    <input className={styles.inputF}
                    type='text'
                    value={input.description}
                    name='description'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.description && (<p className={styles.error}>{errors.description}</p>
                    )}
                 </div>
                    
                {/*REALEASE DATE*/}
                <div className={styles.itemF}>
                    <label className={styles.labelF}>Release Date: </label>
                     <br></br>
                    <input className={styles.inputF}
                    type='date'
                    value={input.released}
                    name='released'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.relDate && (<p className={styles.error}>{errors.released}</p>
                    )}
                </div>

                {/*RATING*/}
                <div className={styles.itemF}>
                   <label className={styles.labelF}>Rating: </label>
                   <br></br>
                   <input className={styles.inputF}
                   type='number'
                   value={input.rating}
                   name='rating'
                   onChange={(e)=>handleChange(e)}
                   />
                   {errors.rating && (<p className={styles.error}>{errors.rating}</p>
                    )}
                </div>

                {/*PLATFORMS*/}
                <div className={styles.itemF}>
                  <label className={styles.labelF}>Platforms:</label>
                  <br></br>
                  <select
                 className={styles.inputF}
                 defaultValue="Seleccionar"
                 onChange={(e) => handleSelect2(e)}
                 >
                <option disabled>Select</option>
                {platformsArr?.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
               ))}
               </select>
             <ul className="ul">
            <li className={styles.listaGP}>
              {input.platforms.map((e) => (
            <div className={styles.divGP} key={e}>
              {e + " "}
              <button className={styles.botonX} type="button" onClick={() => handleDelete2(e)}>X</button>
            </div>
                ))}
              </li>
            </ul>
          </div>
          
              {/*GENRES*/}
              <div>
                 <label className={styles.labelF}>Genres: </label>
                  <br></br>
                  <select className={styles.inputF}
                  defaultValue="Seleccionar"
                  onChange={(e) => handleSelect(e)}
                  >
                    <option disabled>Select</option>
                    {genres && genres?.map((e) => (
                    <option value={e.name} key={e.id}>
                   {e.name}
                    </option>
                     ))}
                   </select>
                        <ul className={styles.ul}>
                            <li className={styles.listaGP}>
                              {input.genres.map((e) => (
                          <div className={styles.divGP} key={e}>
                            {e + " "}
                          <button className={styles.botonX} type="button" onClick={() => handleDelete(e)}>
                           X
                          </button>
                          </div>
                          ))}
                       </li>
                   </ul>
                </div>

                {/* IMAGE */}
                  <div className={styles.itemF}>
                   <label className={styles.labelF}>Image</label>
                   <br></br>
                   <input className={styles.inputF} type="text" value={input.image} onChange={event => handleChange(event)} name='image' 
                  placeholder="Image URL"/>
                  {errors.image && (<p className={styles.error}>{errors.image}</p>)}
                 </div>

                  {/*BUTTON*/} 
                  <div>                       
                 <button className={styles.botonCr} classtype='submit'>CREATE VIDEOGAME</button>
                 </div>
                 <div>
                <Link to = '/home'>
                  <button className={styles.botonV}> ◄ GO BACK</button>
                  </Link>
                </div>       
                
            </form>
            
        </div>
      </div>  

    )
}