import styles from "./input.module.scss"
import {FormEvent} from 'react'

interface InputProps {
    type: string;
    placeholde: string;
    value: string;
    onChange: (e:string) => void;
}

export function Input({type, placeholde, value, onChange}:InputProps){
    return(
        <input className={styles.input} type={type} placeholder={placeholde} value={value} onChange={(e)=>onChange(e.target.value)}/>
    );
}