// vendors
import { FaPlay, FaStop, FaPause, FaExchangeAlt } from 'react-icons/fa'

// components
import { Button } from '../../Button/Button'

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
    <div className={styles.content}>
      <h2>{text}</h2>

      <h3>{shownTime}</h3>

      <div className={styles.buttons}>
        <Button icon onClick={isRunning ? onPause : onPlay}>
          {isRunning ? <FaPause /> : <FaPlay />}
        </Button>

        <Button icon onClick={onReset}>
          <FaStop />
        </Button>

        <Button icon onClick={onSwapTime}>
          <FaExchangeAlt />
        </Button>
      </div>
    </div>
  )
}
