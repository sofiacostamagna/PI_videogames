import React from 'react';
import {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postVideogame, getGenres} from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";



//--------------------------------------VALIDACION---------------------------------------------------
function validater(input){
    let errors= {};
    if(!input.name){// input es el estado local-> pregunto si en mi estado local.name no hay nada
      errors.name= 'Name is required';// entonces en mi objeto .name voy a colocar q se requiere un name

    } else if (!input.description){
        errors.description='Description si required';

    }else if (!input.released){
        errors.released= 'Released date is required';

    }else if (!input.image){
        errors.image= 'Image is required';

    }else if (!input.rating){
        errors.rating= 'Rating is required';

    }else if (!input.platforms){
        errors.platforms= 'Select one or more platforms';

    }else if (!input.genres){
        errors.genres= 'Select one or more genres'
    }

    return errors;

    }

    //--------------------------------------------CREATE VIDEOGAME---------------------------------------------------------

export default function CreateVideogame(){
    //ESTADOS LOCAL:
    const dispatch = useDispatch()
    const genres = useSelector((state)=> state.genres)
    const history= useHistory() // es un metodo que te redirige a la ruta que le diga
    const [errors, setErrors]= useState({});

    const platformsApi = ["PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
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

    function handleCheck(event){ // lo usamos para chequear
        if(event.target.checked){
          setInput(prevState => ({
            ...prevState,
            platforms: [...prevState.platforms, event.target.value]
          }))
        } else {
          setInput(prevState => ({
            ...prevState,
            platforms: prevState.platforms.filter(platform => platform !== event.target.value)
          }))
        }
      }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]// traeme lo que ya tenia y concatename mi target value.
            //lo que hace es almacenando en un array todo lo que yo voy seleccionando
        })
    }

    function handleSubmit(e){
        e.prevetDefault();
        dispatch(postVideogame(input).then((response)=>{
            console.log(response);
        }))
        
        alert('Videogame Created!')
        setInput({ //setea el input a 0
            name: '',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            image: '',
            genres: [],
        })
        history.push('/home') //una vez que se creo el personaje me lleva al home directamente
    }

    function handleDelete(genreName){
        setInput(prevState => ({
            ...prevState,
            genres: prevState.genres.filter(g => g !== genreName)
        }))
    }

    useEffect(()=>{
        dispatch (getGenres());
    }, []);

    //------------------------------------------FORMULARIO ------------------------------------------------------------

    return(
        <div>
            <Link to = '/home'><button>Back</button></Link>
            <h1>Create your videogames</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>

                <div>
                    <label>Name: </label>
                    <input
                    type='text'
                    value={input.name}
                    name= 'name'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && ( // si esta  mi estado error.name--> seteame un p con ese error
                        <p>{errors.name}</p>
                    )}

                </div>

                <div>
                    <label>Description: </label>
                    <input
                    type='text'
                    value={input.description}
                    name='description'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.description && (<p>{errors.description}</p>
                    )}
                    </div>

                    <div>
                        <label>Realease Date: </label>
                        <input
                        type='date'
                        value={input.relDate}
                        name='released'
                        onChange={(e)=>handleChange(e)}
                        />
                        {errors.relDate && (<p>{errors.relDate}</p>
                    )}
                    </div>

                        <div>
                            <label>Rating: </label>
                            <input
                            type='number'
                            value={input.rating}
                            name='rating'
                            onChange={(e)=>handleChange(e)}
                            />
                            {errors.rating && (<p>{errors.rating}</p>
                    )}
                        </div>

                            <div>
                                <label>Platforms: <br/></label>
                                <div id="checkbox-container">
                                    {platformsApi.map((option)=>(
                                        <label key={option}>
                                            <input 
                                            type='checkbox'
                                            name='platfrom'
                                            value={option}
                                            onChange={(e)=>handleCheck(e)}
                                         />
                                        </label>
                                    ))}
                                {errors.platforms && (<p>{errors.platforms}</p>)}
                                </div>  
                            </div>

                            <div>
                                <label>Imagen: </label>
                                <input
                                type='text'
                                value={input.image}
                                name='image'
                                onChange={(e)=>handleChange(e)}
                                />
                                {errors.image && (<p>{errors.image}</p>)}
                            </div>

                            <div>
                                <select onChange={(e)=>handleSelect(e)}>
                                    {genres && genres.map(g => (
                                        <option key={g.id} value={g.name}></option>
                                    ))
                                    }
                                </select>

                                <ul> {/* aca veo lo que voy seleccionando, es una lista que agarra mi estado input genres y me renderiza cada cosa q agarro en el selec*/}
                                     {input.genres.map((genreName, index)=>(
                                         <li key={index}>{genreName}{' '}
                                         <button type='button' onClick={()=> handleDelete(genreName)}>X</button>{/*elimino si me equivoque*/}
                                         </li>
                                     ))}
                                </ul>

                                {errors.genres && (<p>{errors.genres}</p>
                            )}

                            </div>
                              
                            <button type='submit'>Create videogame</button>
                            
                
            </form>
            
        </div>

    )
}