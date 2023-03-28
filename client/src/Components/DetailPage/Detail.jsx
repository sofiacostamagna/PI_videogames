  import React from "react";
  import { Link, useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { getDetail} from "../../redux/actions/actions";
  import { useEffect } from "react";
  import styles from './Detail.module.css'
  
  
export default function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams();//obtengo el id de la URL

    const detailVideogame = useSelector((state)=> state.detail);//obtenemos los datelles del VG del estado global
   
    useEffect(() => { 
        dispatch(getDetail(id));
    }, [dispatch, id]);//actualiza el state cada vez que el id

    const genres = detailVideogame.genres?.join(", ");
    const platforms = detailVideogame.platforms?.join(", ")

    return (
        <div className={styles.fondoDetail}> 
            <div className={styles.conteGeneral}>
                <div className={styles.columnaizquierda}>
                    <img className={styles.imageDetail} src={detailVideogame.image} alt={detailVideogame.name} />
                </div>
                <div className={styles.columnaderecha}>
                    <div className={styles.ConteSub}>
                        <h1 className={styles.tituloDetail}>{detailVideogame.name}</h1>                   
                        <h3 className={styles.tituloElem}>Platforms: <br></br>{platforms}</h3>
                        <h3 className={styles.tituloElem}>Genres: <br></br> {genres}</h3>
                        <h2 className={styles.tituloElem}>Released Date: <br></br> {detailVideogame.released}</h2>
                        <h2 className={styles.tituloElem}>Rating: <br></br> {detailVideogame.rating}</h2>
                        <p className={styles.description}>Description: <br></br>{detailVideogame.description && detailVideogame.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    </div>
                </div> 
                <Link to='/home'>
                    <button className={styles.buttonBack}>GO BACK</button>
                </Link>
            </div>
        </div>
    );
}








