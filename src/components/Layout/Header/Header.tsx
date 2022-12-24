// vendors
import Link from 'next/link'
// import ThemeChanger from './ThemeChanger/ThemeChanger'

// styles
import styles from './Header.module.scss'

function Header(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <header>
        <Link href="/">utiLive</Link>

        {/* <ThemeChanger /> */}

        {/* <div>Menu</div> */}
      </header>
    </nav>
  )
}

export default Header
