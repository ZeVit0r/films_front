import { useEffect, useState } from 'react'

import {FormEvent} from 'react'

import { CardFilm } from '../../components/CardFilm'
import { Navbar } from '../../components/Navbar'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { BiSearchAlt } from 'react-icons/bi'

import styles from './home.module.scss'

import { omdbapi, tstapi } from '../../services/api'
import Modal from 'react-modal'
import { ModalComments } from '../../components/ModalComments'

interface FilmProps {
    Title: string,
    Poster: string,
    Year: string,
    imdbID: string
}

export function Home(){

    const JWTToken = localStorage.getItem('@tst:token')

    const [dataFilms, setDataFilms] = useState<FilmProps[]>([])
    const [searchFilms, setSearchFilms] = useState('')
    const [favoritesFilms, setFavoritesFilms] = useState<string[]>([])


    const initialFetchFilms = async () => {
        await omdbapi.get(`?s=batman&apikey=${import.meta.env.VITE_OMDB_KEY}`,{
        }).then(response => { 
            setDataFilms(response.data.Search)
        });
    }

    const fetchFilmsFavorites = async () => {
        await tstapi.get(`/favorites`,{headers: {"Authorization" : `Bearer ${JWTToken}`}})
        .then(response => { 
            setFavoritesFilms(response.data.favorites.map((favoriteFilm: any) => {
                return favoriteFilm.imdbID
            }))
        });
    }

    const verifyIsFavorite = (imdbID: string) => {
        return favoritesFilms.includes(imdbID)
    }

    const favoriteFilm = async (imdbID: string) => {
        
        const isFavorite = verifyIsFavorite(imdbID)

        if(isFavorite){
            await tstapi.delete(`/favorites/${imdbID}`, {headers: {"Authorization" : `Bearer ${JWTToken}`, "Accept" : "application/json", "Content-Type": "application/json"}})
            .then(response => {});

            fetchFilmsFavorites()

            // setFavoritesFilms(favoritesFilms.filter(element=>{
            //     element != imdbID
            // }))
        } else {
            const data = JSON.stringify({
                imdbID: imdbID
            })
            await tstapi.post(`/favorites`, data, {headers: {"Authorization" : `Bearer ${JWTToken}`, "Accept" : "application/json", "Content-Type": "application/json"}})
            .then(response => {});

            fetchFilmsFavorites()

        }
        
    }

    const searchFilmsOmdb = async (event:FormEvent) =>{
        event.preventDefault()
        await omdbapi.get(`?s=${searchFilms}&apikey=${import.meta.env.VITE_OMDB_KEY}`,{
        }).then(response => { 
            setDataFilms(response.data.Search)
        });
    }

    useEffect(()=>{
        initialFetchFilms();
        fetchFilmsFavorites();
    }, [])

    return(
        <div className={styles.home}>
            <Navbar />

            <form className={styles.search} onSubmit={searchFilmsOmdb}>
                <Input  type='text' placeholde='Search' onChange={setSearchFilms} value={searchFilms} height={42} width={420}/>
                <Button disabled={false} onClick={searchFilmsOmdb} height={42} width={42}>
                    <BiSearchAlt />
                </Button>
            </form>

            <div className={styles.content}>
                <div className={styles.contentCards}>
                    {
                        dataFilms && dataFilms.map(film=>{
                            return(
                                    <CardFilm 
                                        key={film.imdbID} 
                                        title={film.Title} 
                                        imdbID={film.imdbID} 
                                        poster={film.Poster} 
                                        year={film.Year} 
                                        favoriteFilm={favoriteFilm} 
                                        isFavorite={verifyIsFavorite(film.imdbID)}/>
                            )
                        }
                        )
                    }
                </div>
            </div >


        </div>        
    )
}