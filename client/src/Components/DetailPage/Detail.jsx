  import React from "react";
  import { Link, useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { getDetail} from "../../redux/actions/actions";
  import { useEffect } from "react";
  import styles from './Detail.module.css'
  
  export default function Detail(){
      const dispatch = useDispatch();
      const {id} = useParams();
     

      const detailVideogame = useSelector((state)=> state.detail)
   
      useEffect(()=>{ 
      dispatch(getDetail(id)) //así accedo al id de ese detalle
      })
     
      return (
          <div className={styles.fondoDetail}> 

          <div className={styles.conteGeneral}>
                
                <div className={styles.columnaizquierda}>
                  <img className={styles.imageDetail} src={detailVideogame.image} alt={detailVideogame.name} />
                </div>

                  <div className={styles.columnaderecha}>
                 <div className={styles.ConteSub}>
                  <h1 className={styles.tituloDetail}>{detailVideogame.name}</h1>                   
                  <h3 className={styles.tituloElem}>Platforms: {detailVideogame.platforms}</h3>
                  <h3 className={styles.tituloElem}>Genres: {detailVideogame.genres}</h3>
                  <h2 className={styles.tituloElem}>Released Date:{detailVideogame.released}</h2>
                  <h2 className={styles.tituloElem}>Rating:{detailVideogame.rating}</h2>
                  <p className={styles.description}>Description: {detailVideogame.description}</p>
                  </div>
              </div> 
  
          <Link to='/home'>
              <button className={styles.buttonBack}>GO BACK</button>
          </Link>
          </div>
          </div>
      )
  }

//---------------------------------------------------------------------------------------------


  /*import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getVideoGameById, resetVideogame } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = (props) => {
    const dispatch = useDispatch();

    const { id } = props.match.params;
    useEffect(() => {
        dispatch(getVideoGameById(id));
      }, [dispatch, id]);
    
      const videogame = useSelector((state) => state.videogame);
      console.log(videogame)
      let genres1 = []
      if(videogame.dbCreated){
        videogame.genres?.map((s) => genres1.push(s.name))
      }
      return (
        <div className={styles.body}>
          <div className={styles.div}>
            {Object.keys(videogame).length > 0 ? (
              <>
                <div className={styles.contenedor}>
                  <Link to="/home">
                    <button
                      className={styles.back}
                      onClick={() => dispatch(resetVideogame())}
                    ></button>
                  </Link>
                  <img className={styles.img} src={videogame.background_image} alt=""/>
                  <div className={styles.specs}>
                    <h3>{videogame.name}</h3>
    
                    <span className={styles.rocket}>{videogame.released}</span>
    
                    <span className={styles.platforms}>
                      {videogame.platforms?.join(", ")}
                    </span>
                    <span className={styles.list}>
                      {videogame.dbCreated ? genres1?.join(", "): videogame.genres?.join(", ")}
                    </span>
                  </div>
                </div>
                <p className={styles.description}>{videogame.description}</p>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      );
    };


export default Detail; */





