import { Link } from 'react-router-dom'

import { Button } from "../../components/Button";
import { CardLogin } from "../../components/CardLogin";
import { Input } from "../../components/Input";

import {GiFilmSpool} from "react-icons/gi"

import styles from "./login.module.scss"
import { useState } from 'react';
import { api } from '../../services/api';

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    async function login(){
        try{
            await api.post('/auth/signin',{
                email: email,
                password: password
            }).then(response => { console.log(response.data) });
    
            setEmail('');
            setpassword('');
        } catch(e){
            alert('Login ou senha errados')
            setEmail('');
            setpassword('');
        }
    }

    return(
        <CardLogin>
            <GiFilmSpool color="#7a6f9b" size={84}/>
            <h1 className={styles.logo}>IFilms</h1>
            <h2 className={styles.title}>access your account</h2>
            <Input placeholde='E-mail' type='email' onChange={setEmail} value={email} />
            <Input placeholde='Password' type='password' onChange={setpassword} value={password} />
            <Button text='Login' disabled={false} onClick={login}/>
            <Link to="/register" className={styles.register}>register your account!</Link>
        </CardLogin>
    );
}