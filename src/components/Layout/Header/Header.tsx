// styles
import styles from './Header.module.scss'
import ThemeChanger from './ThemeChanger/ThemeChanger'

function Header(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <a href="/">UtiLive</a>
      <ThemeChanger />
      <div>Menu</div>
    </nav>
  )
}

export default Header
