/*import React from 'react';
import styles from './paginado.module.css';


export default function Paginado ({ videogamesPerPage, allVideogames, paginado }){
    const pageNumbers = []

    //recorro un array y voy a tomar un n entero q resulta de la division de todos VG con VG por pag.
    for (let i=1; i<Math.ceil(allVideogames/videogamesPerPage); i++){ //Math.ceil redondea para arriba.
        pageNumbers.push(i)// el resultado lo pusheo a pageNumbers
    }

    return (
        <nav>
            <ul className={styles.ul}>
                { pageNumbers && pageNumbers.map((number) => ( // nos fijamos si el array de pageNumbres tiene algo --> si tiene mapea 
                //y me devuelve cada uno de los n que tengo por pag
                    <li className={styles.paginado} key={number}>
                    <a className={styles.botonPaginado} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}; */

import React from 'react';
import styles from './paginado.module.css';


export default function Paginado ({ videogamesPerPage, allVideogames, currentPage, paginado }){
    const pageNumbers = []

    // Recorro un array y voy a tomar un n entero que resulta de la division de todos VG con VG por pag.
    for (let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++){ // Corregimos la condición de salida y permitimos que i llegue al valor de totalPages
        pageNumbers.push(i)// el resultado lo pusheo a pageNumbers
    }

    return (
        <nav>
            <ul className={styles.ul}>
                <li className={styles.paginado}>
                    <button
                        className={styles.botonPaginado}
                        onClick={() => currentPage > 1 && paginado(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt; {/* Agregamos la flecha izquierda */}
                    </button>
                </li>
                { pageNumbers && pageNumbers.map((number) => (
                    <li className={styles.paginado} key={number}>
                        <button
                            className={`${styles.botonPaginado} ${number === currentPage ? styles.active : ''}`} // Agregamos la clase "active" al botón de la página actual
                            onClick={() => paginado(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={styles.paginado}>
                    <button
                        className={styles.botonPaginado}
                        onClick={() => currentPage < pageNumbers.length && paginado(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                    >
                        &gt; {/* Agregamos la flecha derecha */}
                    </button>
                </li>
            </ul>
        </nav>
    )
};
