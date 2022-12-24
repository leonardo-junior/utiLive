// styles
import styles from './PomodoroRunning.module.scss'

type PomodoroRunningProps = {
  text: string
  shownTime: string
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSwapTime: () => void
}

export const PomodoroRunning = ({
  text,
  shownTime,
  onPlay,
  onPause,
  onReset,
  onSwapTime,
}: PomodoroRunningProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h1>{text}</h1>

        <h2>{shownTime}</h2>

        <div className={styles.buttons}>
          <button onClick={onPlay}>Iniciar</button>

          <button onClick={onPause}>Pausar</button>

          <button onClick={onReset}>Parar</button>

          <button onClick={onSwapTime}>Trocar</button>
        </div>
      </div>
    </div>
  )
}
