// vendors
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { Disclosure } from '@headlessui/react'

// components
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'

// styles
import styles from './Random.module.scss'

export const Random = (): JSX.Element => {
  const [drawedNumber, setDrawedNumber] = useState<number[]>([])

  const minRef = useRef(1)
  const maxRef = useRef(60)
  const numbersOfDrawRef = useRef(6)

  function onChange(event: ChangeEvent<HTMLInputElement>, ref: MutableRefObject<number>) {
    ref.current = +event.target.value
  }

  function getRandomNumber(min = 1, max = 60) {
    return Math.ceil(Math.random() * (max - min + 1))
  }

  function getRandomNumbers(quantity: number) {
    const drawed: number[] = []

    while (drawed.length < quantity) {
      const random = getRandomNumber(minRef.current, maxRef.current)

      if (!drawed.includes(random)) {
        drawed.push(random)
      }
    }

    const ordenedDraw = drawed.sort((a, b) => a - b)

    return ordenedDraw
  }

  function handleRandomNumbers() {
    const maxNumberToDrawn = maxRef.current - minRef.current + 1
    const hasEnoughNumbersToDrawn = numbersOfDrawRef.current <= maxNumberToDrawn

    if (!hasEnoughNumbersToDrawn) return

    const randoms = getRandomNumbers(numbersOfDrawRef.current)

    setDrawedNumber(randoms)
  }

  return (
    <Container title="Números da sorte">
      <section className={styles.content}>
        <div className={styles.drawedNumbers}>
          {drawedNumber?.map((val, index) => {
            return <span key={index}>{val}</span>
          })}
        </div>

        <Button text="Sortear" onClick={handleRandomNumbers} />

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className={styles.button}>
                <span>Alterar regras sorteio</span>

                {open ? <FaAngleDown /> : <FaAngleRight />}
              </Disclosure.Button>

              <Disclosure.Panel className={styles.rulesContainer}>
                <label>Quantidade de números a sortear</label>
                <input
                  type="number"
                  placeholder={'6'}
                  onChange={(event) => onChange(event, numbersOfDrawRef)}
                />

                <label htmlFor="min-value">Valor mínimo</label>
                <input
                  name="min-value"
                  type="number"
                  placeholder={'1'}
                  onChange={(event) => onChange(event, minRef)}
                />

                <label>Valor máximo</label>
                <input type="number" placeholder={'60'} onChange={(event) => onChange(event, maxRef)} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </section>
    </Container>
  )
}
