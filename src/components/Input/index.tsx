import styles from "./input.module.scss"

interface InputProps {
    type: string;
    placeholde: string;
}

export function Input({type, placeholde}:InputProps){
    return(
        <input className={styles.input} type={type} placeholder={placeholde} />
    );
}