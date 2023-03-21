import React from 'react';


export default function Paginado ({ videogamesPerPage, allVideogames, paginado }){
    const pageNumbers = []

    //recorro un array y voy a tomar un n entero q resulta de la division de todos VG con VG por pag.
    for (let i=1; i<Math.ceil(allVideogames/videogamesPerPage); i++){ //Math.ceil redondea para arriba.
        pageNumbers.push(i)// el resultado lo pusheo a pageNumbers
    }

    return (
        <nav>
            <ul>
                { pageNumbers && pageNumbers.map((number) => ( // nos fijamos si el array de pageNumbres tiene algo --> si tiene mapea 
                //y me devuelve cada uno de los n que tengo por pag
                    <li key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}; 