import styles from "./button.module.scss"

interface ButtonProps {
    text: string;
    disabled: boolean;
}

export function Button({text, disabled}: ButtonProps) {
    return(
        <button className={styles.button}>
            {text}
        </button>
    );
}