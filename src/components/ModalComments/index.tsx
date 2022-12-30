import { useState, ReactElement, useEffect } from 'react'
import { tstapi } from '../../services/api';

import { useAuth } from '../../context/auth'

import Modal from 'react-modal'
import { Button } from '../Button';
import { Input } from '../Input';

import { BsFillStarFill } from 'react-icons/bs';
import styles from './modalComments.module.scss'

interface ModalCommentsProps {
    isOpen: boolean;
    onRequestClose: () => void;
    imdbID: string;
}

interface ReviewsProps {
    comment: string;
    imdbID: string;
    user: {
        name: string;
    }
}


export function ModalComments ({isOpen, onRequestClose, imdbID}: ModalCommentsProps){

    const JWTToken = localStorage.getItem('@tst:token')

    const { user } = useAuth()

    const [modalIsOpen, setIsOpen] = useState(false);

    const [reviews, setReviews] = useState<ReviewsProps[]>([])

    const [comment, setComment] = useState('')
    const [stars, setStars] = useState(1)

    const fetchReviews = async () => {
        await tstapi.get(`/reviews/${imdbID}`,{headers: {"Authorization" : `Bearer ${JWTToken}`}})
        .then(response => {
            setReviews(response.data.reviews)
            console.log("AKI"+response.data.reviews)
        });
    }

    const clickStars = () => {
        const starsView = []
        for(let i = 1; i <= 5; i++){
            if(i <= stars){
                starsView.push(
                    <BsFillStarFill key={i} className={styles.iconStars} onClick={()=>setStars(i)} color="#ffb703" size={24} />
                )
            } else {
                starsView.push(
                    <BsFillStarFill key={i} className={styles.iconStars} onClick={()=>setStars(i)} color="#ccc" size={24}/>
                ) 
            }
        }

        return starsView;
    }

    useEffect(()=>{
        fetchReviews()
    }, [])

    const sendReview = async() => {

        const data = JSON.stringify({
            comment: comment,
            stars: stars
        })

        await tstapi.post(`/reviews/${imdbID}`,data, {headers: {"Authorization" : `Bearer ${JWTToken}`, "Accept" : "application/json", "Content-Type": "application/json"}})
        .then(response => {
            console.log(response)

            fetchReviews()
            setComment('')
            setStars(1)
        })
    }

    const checkComment = () => {
        const check = reviews.filter((review)=> review.user.name === user?.name)
        if(check.length == 0){
            return false
        } else {
            return true
        }
    }

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="modal-comments"
        ariaHideApp={false}
        >
            <>
                <h1>Reviews</h1>
                <hr />
                <div  className={styles.content}>
                {
                    reviews && reviews.map((review)=>{
                        return (
                                <div key={review.user.name} className={styles.item}>
                                    <div className={styles.comment}>
                                        <p>{review.comment}</p>
                                    </div>
                                    <div className={styles.username}>
                                        <b>por: </b>
                                        <p>{review.user.name}</p>
                                    </div>
                                </div>
                        )
                    }
                    )
                }
                </div>
                <hr />
                <div className={styles.comment}>
                    {/* <Input onChange={setComment} placeholde="Faça seu comentario.." type="text" value={comment} height={110} width={280} /> */}
                    <textarea className={styles.textareaComment} name="comentarios" cols={30} rows={5} onChange={(event) => setComment(event.target.value)} value={comment}></textarea>
                    <div className={styles.stars}>
                        <p>Estrelas: </p>
                        {
                            clickStars()
                        }
                    </div>
                    <div className={styles.buttonComment}>
                        <Button disabled={checkComment()} onClick={sendReview} height={84} width={120} text="enviar Review!" />
                    </div>
                </div>
            </>
        </Modal>
    )
}