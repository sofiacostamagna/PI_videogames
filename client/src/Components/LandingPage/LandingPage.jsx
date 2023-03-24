import React from "react";
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';



export default function LandingPage(){
    return(
        <div className={styles.fondo}>
            <h1 className={styles.title}>Welcome To Videogames</h1>
            <h2 className={styles.subtitle}>Are you ready? ... </h2>
            <Link to='/home'>
                <button className={styles.button}>Start</button>
            </Link>
        </div>
    )
}