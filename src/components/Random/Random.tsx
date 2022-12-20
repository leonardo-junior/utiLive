// vendors
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react'

// styles
import styles from './Random.module.scss'

function Random (): JSX.Element {
  const [drawedNumber, setDrawedNumber] = useState<number[]>([])

  const minRef = useRef(1)
  const maxRef = useRef(60)
  const numbersOfDrawRef = useRef(6)

  function onChange (event: ChangeEvent<HTMLInputElement>, ref: MutableRefObject<number>) {
    ref.current = +event.target.value
  }

  function getRandomNumber (min = 1, max = 60) {
    return Math.ceil(Math.random() * (max - min + 1))
  }

  function getRandomNumbers (quantity: number) {
    const drawed: number[] = []

    while(drawed.length < quantity) {
      const random =  getRandomNumber(minRef.current, maxRef.current)

      if(!drawed.includes(random)) {
        drawed.push(random)
      }
    }

    return drawed
  }

  function handleRandomNumbers () {
    const randoms =  getRandomNumbers(6)

    setDrawedNumber(randoms)
  }

  return(
    <div className={styles.container}>
      <h2>Números da sorte</h2>

      <div>
        {drawedNumber?.map((val, index) => {
            return <span key={index}>{val}</span>
          })
        }
      </div>

      <span>Quantity of number drawed</span>
      <input type='number' placeholder={'6'} onChange={(event) => onChange(event, numbersOfDrawRef)} />

      <span>Min value</span>
      <input type='number' placeholder={'1'} onChange={(event) => onChange(event, minRef)} />

      <span>Max value</span>
      <input type='number' placeholder={'60'} onChange={(event) => onChange(event, maxRef)} />

      <button onClick={handleRandomNumbers}>Sortear</button>
    </div>
  )
}

export default Random