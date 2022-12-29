import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from "../../components/Button";
import { CardLogin } from "../../components/CardLogin";
import { Input } from "../../components/Input";

import {GiFilmSpool} from "react-icons/gi"

import styles from "./register.module.scss"
import { tstapi } from '../../services/api';

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate();

    async function register(event:FormEvent){
        try{
            await tstapi.post('/auth/signup',{
                name: name,
                email: email,
                password: password
            }).then(response => { console.log(response.data) });
    
            setName('');
            setEmail('');
            setpassword('');

            navigate('/')
        } catch(e){
            alert('Ja existe uma conta vinculada a esse email!')
            setName('');
            setEmail('');
            setpassword('');
        }
    }

    return(
        <div className={styles.content}>
            <CardLogin>
                <GiFilmSpool color="#7a6f9b" size={84}/>
                <h1 className={styles.logo}>IFilms</h1>
                <h2 className={styles.title}>register your account</h2>
                <Input placeholde='Your Name' type='text' value={name} onChange={setName}/>
                <Input placeholde='E-mail' type='email' value={email} onChange={setEmail}/>
                <Input placeholde='Password' type='password' value={password} onChange={setpassword}/>
                <Button text='Register' disabled={false} onClick={register}/>
                <Link to="/" className={styles.login}>I already have an account!</Link>
            </CardLogin>
        </div>
    );
}