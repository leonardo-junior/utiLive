// vendors
import { SetStateAction } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

// components
import { Button } from '../../Button/Button'
import { Container } from '../../Container/Container'

// styles
import styles from './PomodoroSettings.module.scss'

type PomodoroSettingsProps = {
  workTime: number
  setWorkTime: (prevItem: SetStateAction<number>) => void
  breakTime: number
  setBreakTime: (prevItem: SetStateAction<number>) => void
  onStartTimer: () => void
}

export const PomodoroSettings = ({
  workTime,
  setWorkTime,
  breakTime,
  setBreakTime,
  onStartTimer,
}: PomodoroSettingsProps): JSX.Element => {
  // TODO add hold button and change value
  function plusWorkTime() {
    if (workTime >= 120) return

    setWorkTime((prev) => prev + 5)
  }

  function lessWorkTime() {
    if (workTime <= 15) return

    setWorkTime((prev) => prev - 5)
  }

  function plusBreakTime() {
    if (breakTime >= 30) return

    setBreakTime((prev) => prev + 1)
  }

  function lessBreakTime() {
    if (breakTime <= 3) return

    setBreakTime((prev) => prev - 1)
  }

  return (
    <Container title="Pomodoro">
      <div className={styles.content}>
        <div className={styles.timers}>
          <section>
            <h2>Trabalho</h2>

            <Button icon onClick={plusWorkTime}>
              <FaPlus />
            </Button>

            <h3>{workTime}</h3>

            <Button icon onClick={lessWorkTime}>
              <FaMinus />
            </Button>
          </section>

          <section>
            <h2>Descanso</h2>

            <Button icon onClick={plusBreakTime}>
              <FaPlus />
            </Button>

            <h3>{breakTime}</h3>

            <Button icon onClick={lessBreakTime}>
              <FaMinus />
            </Button>
          </section>
        </div>

        <Button text="Iniciar" onClick={onStartTimer} />
      </div>
    </Container>
  )
}
