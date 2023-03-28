import React from 'react';
import styles from './paginado.module.css';


                                  //VG x pag -Todos VG-Pag actual -Cambio de pag- Actualiza el state de pag actual
export default function Paginado ({ videogamesPerPage, allVideogames, currentPage, paginado, setCurrentPage }){
    const pageNumbers = []//array de numeros->pag disponible
    const arrowPage= currentPage;

    // Recorro un array y voy a tomar un n entero que resulta de la division de todos VG con VG por pag.
    for (let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++){ // Corregimos la condición de salida y permitimos que i llegue al valor de totalPages
        pageNumbers.push(i)// el resultado lo pusheo a pageNumbers
    }

    //Manejamos los botones de navegacion de la pag next y pev
    const next= (e)=>{ //verifa s la pag actual es < q la pag actual
        if(currentPage < pageNumbers.length){
            setCurrentPage(currentPage + 1);//actualizamos el estado de la pag actual
        }
    }

    const prevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <nav>
            <ul className={styles.ul}>
                <li className={styles.paginado}>
                    <button
                        className={styles.botonPaginado}
                        onClick={((e) => prevPage(e))}
                        disabled={currentPage === 1}>⬅</button>
                
                </li>
                { pageNumbers && pageNumbers.map((number) => (
                    <li className={styles.paginado} key={number}>
                        <a
                            className={`${styles.botonPaginado} ${number === currentPage ? styles.active : ''}`} // Agregamos la clase "active" al botón de la página actual
                            onClick={() => paginado(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <li className={styles.paginado}>
                    <button
                        className={styles.botonPaginado}
                        onClick={next}
                        disabled={currentPage === pageNumbers.length}>⮕</button>
                </li>
            </ul>
        </nav>
    )
};
