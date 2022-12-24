// vendors
import { useRef, useState } from 'react'
import { Popover } from '@headlessui/react'
import { FaExclamation } from 'react-icons/fa'

// components
import { Container } from '../Container/Container'
import { PomodoroRunning } from './PomodoroRunning/PomodoroRunning'
import { PomodoroSettings } from './PomodoroSettings/PomodoroSettings'

// styles
import styles from './Pomodoro.module.scss'

export const Pomodoro = (): JSX.Element => {
  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  const [isToShowConfig, setIsToShowConfig] = useState(true)
  const [isToShowWork, setIsToShowWork] = useState(false)
  const [isToShowBreak, setIsToShowBreak] = useState(false)

  const [showWorkTime, setShowWorkTime] = useState(convertToMinutes(workTime * 60))
  const [showBreakTime, setShowBreakTime] = useState(convertToMinutes(breakTime * 60))

  const [isRunning, setIsRunning] = useState(false)

  const runningTimeWorkRef = useRef<number>(25 * 60)
  const runningTimeBreakRef = useRef<number>(5 * 60)
  const intervalWorkRef = useRef<NodeJS.Timer>()
  const intervalBreakRef = useRef<NodeJS.Timer>()

  function clearIntervals() {
    clearInterval(intervalBreakRef.current)
    clearInterval(intervalWorkRef.current)
  }

  function convertToMinutes(timeInSeconds: number) {
    const minutes = Math.floor(+timeInSeconds / 60)
    const seconds = +timeInSeconds % 60

    const shownSeconds = seconds < 10 ? '0' + seconds : seconds
    const shownMinutes = minutes < 10 ? '0' + minutes : minutes

    return `${shownMinutes}:${shownSeconds}`
  }

  function changeToWorkTime() {
    setIsToShowWork(true)
    setIsToShowBreak(false)
  }

  function changeToBreakTime() {
    setIsToShowBreak(true)
    setIsToShowWork(false)
  }

  function onGoToBreak() {
    const resetTime = breakTime * 60

    setShowBreakTime(convertToMinutes(resetTime))
    runningTimeBreakRef.current = resetTime

    clearIntervals()
    setIsRunning(false)

    changeToBreakTime()
  }

  function onGoToWork() {
    const resetTime = workTime * 60

    setShowWorkTime(convertToMinutes(resetTime))
    runningTimeWorkRef.current = resetTime

    clearIntervals()
    setIsRunning(false)

    changeToWorkTime()
  }

  function onStartTimer() {
    if (isRunning) return

    setShowWorkTime(convertToMinutes(workTime * 60))

    runningTimeWorkRef.current = workTime * 60
    runningTimeBreakRef.current = breakTime * 60

    setIsRunning(true)
    setIsToShowWork(true)
    setIsToShowConfig(false)

    runWorkTime()
  }

  function onPauseTimer() {
    clearIntervals()

    setIsRunning(false)
  }

  function onResetTimer() {
    clearIntervals()

    setIsRunning(false)
    setIsToShowConfig(true)
    setIsToShowBreak(false)
    setIsToShowWork(false)
  }

  function runWorkTime() {
    if (isRunning) return

    intervalWorkRef.current = setInterval(() => {
      const newTime = runningTimeWorkRef.current - 1

      const shownWorkTime = convertToMinutes(newTime)

      setShowWorkTime(shownWorkTime)

      runningTimeWorkRef.current = newTime

      if (newTime < 1) {
        clearIntervals()

        runningTimeWorkRef.current = workTime * 60
        intervalWorkRef.current = undefined

        runBreakTime()
        changeToBreakTime()
      }
    }, 1000)

    setIsRunning(true)
  }

  function runBreakTime() {
    if (isRunning) return

    intervalBreakRef.current = setInterval(() => {
      const newTime = runningTimeBreakRef.current - 1

      const shownBreakTime = convertToMinutes(newTime)

      setShowBreakTime(shownBreakTime)

      runningTimeBreakRef.current = newTime

      if (newTime < 1) {
        clearIntervals()

        runningTimeBreakRef.current = breakTime * 60
        intervalBreakRef.current = undefined

        runWorkTime()
        changeToWorkTime()
      }
    }, 1000)

    setIsRunning(true)
  }

  return (
    <>
      <Container title="Pomodoro">
        <>
          {isToShowConfig && (
            <PomodoroSettings
              workTime={workTime}
              breakTime={breakTime}
              setWorkTime={setWorkTime}
              setBreakTime={setBreakTime}
              onStartTimer={onStartTimer}
            />
          )}

          {isToShowWork && (
            <PomodoroRunning
              text="Trabalho"
              isRunning={isRunning}
              shownTime={showWorkTime}
              onPlay={runWorkTime}
              onPause={onPauseTimer}
              onReset={onResetTimer}
              onSwapTime={onGoToBreak}
            />
          )}

          {isToShowBreak && (
            <PomodoroRunning
              text="Descanso"
              isRunning={isRunning}
              shownTime={showBreakTime}
              onPlay={runBreakTime}
              onPause={onPauseTimer}
              onReset={onResetTimer}
              onSwapTime={onGoToWork}
            />
          )}

          <Popover className={styles.popover}>
            <Popover.Button className={styles.button}>
              <FaExclamation />
            </Popover.Button>

            <Popover.Panel className={styles.info}>
              Pomodoro consiste em um ciclo de duas horas. A cada 25 minutos sem interrupções dedicado a uma
              tarefa, você deve fazer uma pausa de 5 minutos. Ao final do ciclo de duas horas, você deverá
              fazer uma pausa maior de 30 minutos e depois começar um novo Pomodoro. Caso deseje pode alterar
              os tempos para sua melhor adequação.
            </Popover.Panel>
          </Popover>
        </>
      </Container>
    </>
  )
}
