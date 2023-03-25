import React from "react";
import { Link } from 'react-router-dom';
import styles from './LandigPage.module.css';



export default function LandingPage(){
    return(
        <div className={styles.fondo}>
            <h1 className={styles.title}>WELCOME TO VIDEOGAMES</h1>
            <Link to='/home'>
                <button className={styles.button}>START</button>
            </Link>
        </div>
    )
}