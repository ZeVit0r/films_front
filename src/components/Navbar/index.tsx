import { Link } from 'react-router-dom'

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
                {/* <li className={styles.li_selected}> */}
                <li>
                    <GiFilmStrip color="#FFF" size={24} />
                    <Link to="/" className={styles.button_menu}>Filmes</Link>
                </li>
                <li>
                    <GiRoundStar color="#FFF" size={24} />
                    <Link to="/favorities" className={styles.button_menu}>Meus Favoritos</Link>
                </li>
                <li>
                    <GiNotebook color="#FFF" size={24} />
                    <Link to="/reviews" className={styles.button_menu}>Meus Reviews</Link>
                </li>
            </ul>
            <div className={styles.logout}>
                <BiLogOut color="#FFF" size={32}/>
            </div>
        </header>
    );
}