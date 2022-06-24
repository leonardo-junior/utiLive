// vendors
import { ChangeEvent, useRef, useState } from 'react'

// components
import Layout from '../components/Layout/Layout'

function Pomodoro (): JSX.Element {
  const [workTime, setWorkTime] = useState(25*60)
  const [breakTime, setBreakTime] = useState(5*60)

  const [isWorking, setIsWorking] = useState(false)

  const intervalWorkRef = useRef<NodeJS.Timer>()
  const intervalBreakRef = useRef<NodeJS.Timer>()

  function onChangeWorkTime (event: ChangeEvent<HTMLInputElement>) {
    const newWorkTime = +event.target.value

    setWorkTime(newWorkTime)
  }

  function onChangeBreakTime (event: ChangeEvent<HTMLInputElement>) {
    const newBreakTime = +event.target.value

    setBreakTime(newBreakTime)
  }

  function runWorkTime () {
    let workTimer = workTime

    intervalWorkRef.current = setInterval(() => {
      workTimer--

      setWorkTime(workTimer)

      if(workTimer < 1) {
        setWorkTime(5)
        clearInterval(intervalWorkRef.current)
        clearInterval(intervalBreakRef.current)
        runBreakTime()
      }
    }, 1000)

    setIsWorking(true)
  }

  function runBreakTime () {
    let breakTimer = breakTime

    intervalBreakRef.current = setInterval(() => {
      breakTimer--

      setBreakTime(breakTimer)

      if(breakTimer < 1) {
        setBreakTime(5)
        clearInterval(intervalBreakRef.current)
        clearInterval(intervalWorkRef.current)
        runWorkTime()
      }
    }, 1000)

    setIsWorking(false)
  }

  function onActiveTimer () {
    if(!isWorking) {
      runWorkTime()
      return
    }

    runBreakTime()
  }

  function onPauseTimer () {
    clearInterval(intervalBreakRef.current)
    clearInterval(intervalWorkRef.current)

    setIsWorking(!isWorking)
  }

  return (
    <Layout title='Pomodoro' description='Pomodoro timer'>
      <div>
        <div>Tempo de trabalho</div>
        <input type='number' value={workTime} onChange={onChangeWorkTime}/>
        <h1>{workTime}</h1>
      </div>

      <div>
        <div>Tempo de descanso</div>
        <input type='number' value={breakTime} onChange={onChangeBreakTime}/>
        <h1>{breakTime}</h1>
      </div>

      <button onClick={onActiveTimer}>Start</button>
      <button onClick={onPauseTimer}>Pause</button>
    </Layout>
  )
}

export default Pomodoro
