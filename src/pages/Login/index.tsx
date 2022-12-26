import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";

import {GiFilmSpool} from "react-icons/gi"

import styles from "./login.module.scss"

export function LoginPage() {
    return(
        <Card>
            <GiFilmSpool color="#7a6f9b" size={84}/>
            <h1 className={styles.logo}>IFilms</h1>
            <h2 className={styles.title}>access your account</h2>
            <Input placeholde='E-mail' type='email'/>
            <Input placeholde='Password' type='password'/>
            <Button text='Login' disabled={false}/>
            <a className={styles.register}>register your account!</a>
        </Card>
    );
}