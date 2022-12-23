
interface ButtonProps {
    text: string;
    disabled: boolean;
}

export function Button({text, disabled}: ButtonProps) {
    return(
        <button>
            {text}
        </button>
    );
}