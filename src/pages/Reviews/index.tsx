import { useEffect, useState } from "react";
import { CardReviews } from "../../components/CardReviews";
import { Navbar } from "../../components/Navbar";
import { omdbapi, tstapi } from "../../services/api";

import styles from "./reviews.module.scss"

interface myReviewsFilmsProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Year: string;
    myComment: string;
    myStars: number;
}

export function Reviews() {

    const JWTToken = localStorage.getItem('@tst:token')

    const [myReviews, setMyReviews] = useState([])
    const [isLoadReviews, setIsLoadReviews] = useState<boolean>(true)
    const [myReviewsFilms, setMyReviewsFilms] = useState<myReviewsFilmsProps[]>([])


    const fetchMyReviews = async () => {
        await tstapi.get(`/reviews/my`,{headers: {"Authorization" : `Bearer ${JWTToken}`}})
        .then(response => {
            setMyReviews(response.data.reviews)
            setIsLoadReviews(false)
        });
    }

    const fetchFilms = async (review: any ) => {
        await omdbapi.get(`?i=${review.imdbID}&apikey=${import.meta.env.VITE_OMDB_KEY}`,{
        }).then(response => {setMyReviewsFilms(myReviewsFilms => [...myReviewsFilms, {
            imdbID: response.data.imdbID,
            myComment: review.comment,
            myStars: review.stars,
            Poster: response.data.Poster,
            Title: response.data.Title,
            Year: response.data.Year,
        }])});
    }

    const deleteReview = async (imdbID: string) => {
        await tstapi.delete(`/reviews/${imdbID}`,{headers: {"Authorization" : `Bearer ${JWTToken}`}})
        .then(response => {
            setMyReviewsFilms(myReviewsFilms.filter((review)=>review.imdbID != imdbID))
            fetchMyReviews()
        });
    }

    useEffect(()=>{
        fetchMyReviews()
    }, [])

    useEffect(()=>{
        myReviews.forEach(async review=>{
            await fetchFilms(review)
        })
    }, [isLoadReviews])

    console.log(myReviewsFilms)

    return(
        <div className={styles.reviews}>
            <Navbar />

            <div className={styles.content}>
                {
                    myReviewsFilms.map(review => 
                            <CardReviews 
                                key={review.imdbID} 
                                Title={review.Title} 
                                Poster={review.Poster} 
                                Year={review.Year} 
                                imdbID={review.imdbID} 
                                myComment={review.myComment}
                                myStars={review.myStars}
                                deleteReview={deleteReview}/>
                    )
                }    
            </div>
        </div>
    )
}