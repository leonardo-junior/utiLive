// vendors
import { FaPlay, FaStop, FaPause, FaExchangeAlt } from 'react-icons/fa'

// components
import { Button } from '../../Button/Button'
import { Container } from '../../Container/Container'

// styles
import styles from './PomodoroRunning.module.scss'

type PomodoroRunningProps = {
  text: string
  shownTime: string
  isRunning: boolean
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSwapTime: () => void
}

export const PomodoroRunning = ({
  text,
  shownTime,
  isRunning,
  onPlay,
  onPause,
  onReset,
  onSwapTime,
}: PomodoroRunningProps): JSX.Element => {
  return (
    <Container title="Pomodoro">
      <div className={styles.content}>
        <h2>{text}</h2>

        <h3>{shownTime}</h3>

        <div className={styles.buttons}>
          <Button icon onClick={isRunning ? onPause : onPlay}>
            {isRunning ? <FaPause /> : <FaPlay />}
          </Button>

          <Button onClick={onReset}>
            <FaStop />
          </Button>

          <Button onClick={onSwapTime}>
            <FaExchangeAlt />
          </Button>
        </div>
      </div>
    </Container>
  )
}
