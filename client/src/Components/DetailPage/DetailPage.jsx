import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPage } from '../../redux/actions/actions';
import { useEffect } from "react";

export default function DetailPage(props){
    const dispatch = useDispatch()
    

    useEffect(()=> {
        dispatch(getDetailPage(props.match.params.id));// para acceder al id de ese detalle--> usamo params 

    }, [dispatch])

     const detailVideogames = useSelector((state)=> state.DetailPage)

     return(
        <div>
            {
                detailVideogames.length > 0 ?
                <div>
                    <h1>Name: {detailVideogames[0].name}</h1>
                    <p>Platfroms: {detailVideogames[0].platforms}</p>
                    <p>Genres: {detailVideogames[0].genres}</p>
                    <p>Released Date: {detailVideogames[0].released}</p>
                    <p>Rating: {detailVideogames[0].rating}</p>
                    <img src={detailVideogames.image} alt={detailVideogames.name} style={{ borderRadius: '9999999999999999rem'}} />
            
               </div> : <p>Loaging...</p>
            }

            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
     )
}