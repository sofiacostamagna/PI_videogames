import React from "react";
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ name, image, genres, rating, id }) {
    
    return (
        <div className={styles.cardContenedor}>
        <div className={styles.card}>

            <Link to ={`/videogames/${id}`}>
            <h3 className={styles.name}>{name}</h3>
            </Link>
            <h5 className={styles.genres}>GENRES: {genres?.join(", ")}</h5>
            <h5 className={styles.raiting}>RAITING: {rating}</h5>
            <img className={styles.image} src={image} alt={name}  width='250px' height= '250px'/>
        </div>
      </div>  
    );
}

