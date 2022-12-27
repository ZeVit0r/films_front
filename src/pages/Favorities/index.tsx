import { Navbar } from "../../components/Navbar";

import styles from "./favorities.module.scss"

export function Favorities() {
    return(
        <div className={styles.favorities}>
            <Navbar />

            <h1>Favorities</h1>
        </div>
    )
}