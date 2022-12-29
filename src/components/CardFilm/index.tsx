import { useState, useEffect } from 'react'
import { AiFillHeart, AiOutlineComment} from 'react-icons/ai'

import styles from './cardFilm.module.scss'

interface FilmProps {
    title: string,
    poster: string,
    year: string,
    imdbID: string,
    favoriteFilm: (imdbID: string) => void,
    isFavorite: boolean,
}

export function CardFilm({imdbID, poster, title, year, favoriteFilm, isFavorite}: FilmProps){


    return(
        <div className={styles.container}>
            <img src={poster} alt="poster" />
            <h4>{title}</h4>
            <div className={styles.cardContent}>
                <div className={styles.elementCard}>
                    <button onClick={()=>{
                        favoriteFilm(imdbID)
                    }}>
                        <AiFillHeart size={32} className={isFavorite ? styles.favorit : styles.notFavorit} />
                    </button>
                    <p>favoritar</p>
                </div>
                <div className={styles.elementCard}>
                    <AiOutlineComment size={32} className={styles.comment} />
                    <p>comentários</p>
                </div>
            </div>
        </div>
    )
}