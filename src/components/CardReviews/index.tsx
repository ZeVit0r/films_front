import { BsFillTrashFill, BsFillStarFill } from 'react-icons/bs'


import styles from "./cardReviews.module.scss"


interface CardReviewsProps {
        imdbID: string;
        Title: string;
        Poster: string;
        Year: string;
        myComment: string;
        myStars: number;
        deleteReview: (imdbID: string)=>void;
}

export function CardReviews( {Poster, Title, Year, imdbID, myComment, myStars, deleteReview}: CardReviewsProps) {

    
    const viewStars = () => {
        const stars = []
        for(let i = 1; i <= 5; i++) {
            if(i <= myStars){
                stars.push(<BsFillStarFill key={i} size={28} color="#ffb703" />)
            } else {
                stars.push(<BsFillStarFill key={i} size={28} color="#ccc" />)
            }
        }

        return stars
    }

    return(
        <div className={styles.content}>
            <div className={styles.film}>
                <img src={Poster} alt="poster" className={styles.img} />
                <div className={styles.dataFilm}>
                    <p>{Title}</p>
                    <p>{Year}</p>
                </div>
            </div>
            <div className={styles.review}>
                <p>
                    {myComment}
                </p>
            </div>
            <div className={styles.stars}>
                {viewStars()}
            </div>
            <div className={styles.icon}>
                <BsFillTrashFill className={styles.iconDelete} size={32} color="#7a6f9b" onClick={()=>deleteReview(imdbID)} />
            </div>
        </div>
    )
}