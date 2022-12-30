import { ReactElement } from "react";

import {FormEvent} from 'react'

import styles from "./button.module.scss"

interface ButtonProps {
    text?: string;
    disabled: boolean;
    onClick: (e:FormEvent) => void;
    children?: ReactElement;
    height?: number;
    width?: number;
}

export function Button({text, disabled, onClick, children, height, width}: ButtonProps) {
    return(
        disabled
        ?
        <button className={styles.buttonDisabled} disabled style={height != null ? {height:`${height}px`, width:`${width}px`} : {}}>
            {children != null ? children : text}
        </button>
        :
        <button className={styles.button} onClick={(e)=>onClick(e)} style={height != null ? {height:`${height}px`, width:`${width}px`} : {}}>
            {children != null ? children : text}
        </button>
    );
}