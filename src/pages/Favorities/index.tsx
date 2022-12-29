import { useState, useEffect } from 'react'
import { CardFilm } from '../../components/CardFilm';

import { Navbar } from "../../components/Navbar";
import { omdbapi, tstapi } from '../../services/api';

import styles from "./favorities.module.scss"

interface FilmProps {
    Title: string,
    Poster: string,
    Year: string,
    imdbID: string
}

export function Favorities() {

    const JWTToken = localStorage.getItem('@tst:token')

    const [idsFavoritesFilms, setIdsFavoritesFilms] = useState<string[]>([])
    const [favoritesFilms, setFavoritesFilms] = useState<FilmProps[]>([])
    const [isLoadIds, setIsLoadIds] = useState<boolean>(true)

    const fetchIdsFilmsFavorites = async () => {
        await tstapi.get(`/favorites`,{headers: {"Authorization" : `Bearer ${JWTToken}`}})
        .then(response => { 
            setIdsFavoritesFilms(response.data.favorites.map((favoriteFilm: any) => {
                return favoriteFilm.imdbID
            })) 

            setIsLoadIds(false)
        });
    }

    const initialFetchFilms = async (imdbID: string) => {
        await omdbapi.get(`?i=${imdbID}&apikey=${import.meta.env.VITE_OMDB_KEY}`,{
        }).then(response => {setFavoritesFilms(favoritesFilms => [...favoritesFilms, response.data])});
    }

    const favoriteFilm = async (imdbID: string) => {
        await tstapi.delete(`/favorites/${imdbID}`, {headers: {"Authorization" : `Bearer ${JWTToken}`, "Accept" : "application/json", "Content-Type": "application/json"}})
        .then(response => {});

        setFavoritesFilms(favoritesFilms.filter((element)=>{
            return element.imdbID != imdbID
        }))
    }

    useEffect(()=>{
        fetchIdsFilmsFavorites();
    }, [])

    useEffect(()=>{
        idsFavoritesFilms.forEach(async (id)=>{
            await initialFetchFilms(id)
        })
    }, [isLoadIds])

    console.log(favoritesFilms)

    return(
        <div className={styles.favorities}>
            <Navbar />

            <div className={styles.content}>
                <div className={styles.contentCards}>
                    {
                        favoritesFilms && favoritesFilms.map(film=>{
                            return(
                                <CardFilm key={film.imdbID} title={film.Title} imdbID={film.imdbID} poster={film.Poster} year={film.Year} favoriteFilm={favoriteFilm} isFavorite={true}/>
                            )
                        }
                        )
                    }
                </div>
            </div >
        </div>
    )
}