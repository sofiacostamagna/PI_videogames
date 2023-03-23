import React from "react";

export default function Card({ name, image, genres, rating }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
            <img src={image} alt={name}  width='250px' height= '250px'style={{ borderRadius: '9999999999999999rem'}}/>
        </div>
    );
}

