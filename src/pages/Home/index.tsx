import { Navbar } from '../../components/Navbar'
import styles from './home.module.scss'

export function Home(){
    return(
        <div className={styles.home}>
            <Navbar />

            <h1>Home</h1>
        </div>
    )
}