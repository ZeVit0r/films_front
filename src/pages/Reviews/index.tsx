import { Navbar } from "../../components/Navbar";

import styles from "./reviews.module.scss"

export function Reviews() {
    return(
        <div className={styles.reviews}>
            <Navbar />

            <h1>Reviews</h1>
        </div>
    )
}