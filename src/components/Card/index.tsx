import { ReactElement } from "react";

import styles from "./card.module.scss"

interface CardProps {
    children: ReactElement[]
}

export function Card ({children}: CardProps){
    return(
        <div className={styles.card}>
            {children}
        </div>
    );
}