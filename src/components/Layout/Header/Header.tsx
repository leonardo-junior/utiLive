/* eslint-disable @next/next/no-html-link-for-pages */
// styles
import styles from './Header.module.scss'

function Header (): JSX.Element{
  return(
    <nav className={styles.nav}>
      <a href='/'>UtiLive</a>
      <div>Menu</div>
    </nav>
  )
}

export default Header