import { ReactElement } from "react";

import styles from "./card.module.scss"

interface CardLoginProps {
    children: ReactElement[]
}

export function CardLogin ({children}: CardLoginProps){
    return(
        <div className={styles.card}>
            {children}
        </div>
    );
}