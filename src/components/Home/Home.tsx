// components
import { Card } from '../Card/Card'

// styles
import styles from './Home.module.scss'

export const Home = () => {
  return (
    <div className={styles.container}>
      <Card anchor="/random-number" keyName="Números da sorte" image="random-number.png" />

      <Card anchor="/pomodoro" keyName="Pomodoro" image="pomodoro.png" />

      <Card anchor="/calculate-expenses" keyName="Cálculo Gastos" image="calculate-expenses.png" />

      <Card anchor="/" keyName="Contador palavras" className={styles.incomplete} />
    </div>
  )
}
