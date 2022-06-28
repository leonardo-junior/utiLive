// vendors
import { SetStateAction } from 'react'

// styles
import styles from './PomodoroSettings.module.scss'

type PomodoroSettingsProps = {
  workTime: number
  setWorkTime: (prevItem: SetStateAction<number>) => void
  breakTime: number
  setBreakTime: (prevItem: SetStateAction<number>) => void
  onStartTimer: () => void
}

function PomodoroSettings ({
  workTime,
  setWorkTime,
  breakTime,
  setBreakTime,
  onStartTimer
  }: PomodoroSettingsProps): JSX.Element {
  function plusWorkTime () {
    setWorkTime((prev) => prev + 5)
  }

  function lessWorkTime () {
    if(workTime > 15) {
      setWorkTime((prev) => prev - 5)
    }
  }

  function plusBreakTime () {
    setBreakTime((prev) => prev + 1)
  }

  function lessBreakTime () {
    if(breakTime > 3) {
      setBreakTime((prev) => prev - 1)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.timers}>
        <div>
          <h1>Trabalho</h1>
          <button onClick={plusWorkTime}>Mais</button>
          <h2>{workTime}</h2>
          <button onClick={lessWorkTime}>Menos</button>
        </div>

        <div>
          <h1>Descanso</h1>
          <button onClick={plusBreakTime}>Mais</button>
          <h2>{breakTime}</h2>
          <button onClick={lessBreakTime}>Menos</button>
        </div>
      </div>

     <button onClick={onStartTimer}>Iniciar</button>
    </div>
  )
}

export default PomodoroSettings