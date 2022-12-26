import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";

import {GiFilmSpool} from "react-icons/gi"

import styles from "./register.module.scss"

export function RegisterPage() {
    return(
        <Card>
            <GiFilmSpool color="#7a6f9b" size={84}/>
            <h1 className={styles.logo}>IFilms</h1>
            <h2 className={styles.title}>register your account</h2>
            <Input placeholde='Your Name' type='text'/>
            <Input placeholde='E-mail' type='text'/>
            <Input placeholde='Password' type='text'/>
            <Button text='Register' disabled={false}/>
        </Card>
    );
}