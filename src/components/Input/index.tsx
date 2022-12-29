import styles from "./input.module.scss"
import {FormEvent} from 'react'

interface InputProps {
    type: string;
    placeholde: string;
    value: string;
    onChange: (e:string) => void;
    height?: number;
    width?: number;
}

export function Input({type, placeholde, value, onChange, height, width}:InputProps){
    return(
        <input className={styles.input} type={type} placeholder={placeholde} value={value} onChange={(e)=>onChange(e.target.value)} style={height != null ? {height:`${height}px`, width:`${width}px`} : {}}/>
    );
}