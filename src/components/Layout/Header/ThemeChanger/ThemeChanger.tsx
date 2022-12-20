// vendors
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

// styles
import styles from './ThemeChanger.module.scss'

function ThemeChanger() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
  }

  return (
    <div className={styles.container}>
      <button type="button" aria-label="Change theme" onClick={toggleTheme} className={styles.button}>
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </button>
    </div>
  )
}

export default ThemeChanger
