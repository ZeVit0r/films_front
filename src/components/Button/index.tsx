import styles from "./button.module.scss"

interface ButtonProps {
    text: string;
    disabled: boolean;
    onClick: () => void;
}

export function Button({text, disabled, onClick}: ButtonProps) {
    return(
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
}