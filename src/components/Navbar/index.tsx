import styles from './navbar.module.scss'

import { GiFilmSpool, GiFilmStrip, GiRoundStar, GiNotebook } from "react-icons/gi"
import { BiLogOut } from 'react-icons/bi'


interface NavbarProps {

}

export function Navbar( {}:NavbarProps ){
    return(
        <header className={styles.navbar}>
            <div className={styles.logo}>
                <GiFilmSpool color="#FFF" size={56}/>
                <h1 className={styles.logo}>IFilms</h1>
            </div>
            <ul className={styles.menu}>
                <li className={styles.li_selected}>
                    <GiFilmStrip color="#FFF" size={24} />
                    <a className={styles.button_menu_selected}>Filmes</a>
                </li>
                <li>
                    <GiRoundStar color="#FFF" size={24} />
                    <a className={styles.button_menu}>Meus Favoritos</a>
                </li>
                <li>
                    <GiNotebook color="#FFF" size={24} />
                    <a className={styles.button_menu}>Meus Reviews</a>
                </li>
            </ul>
            <div className={styles.logout}>
                <BiLogOut color="#FFF" size={32}/>
            </div>
        </header>
    );
}