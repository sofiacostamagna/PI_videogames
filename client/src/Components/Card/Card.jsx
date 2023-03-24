import React from "react";
import { Link } from 'react-router-dom';

export default function Card({ name, image, genres, rating, id }) {
    return (
        <div>
            <Link to ={`/videogames/${id}`}>
            <h3>{name}</h3>
            </Link>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
            <img src={image} alt={name}  width='250px' height= '250px'style={{ borderRadius: '9999999999999999rem'}}/>
        </div>
    );
}

