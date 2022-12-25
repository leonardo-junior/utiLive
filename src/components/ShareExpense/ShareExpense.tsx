// vendors
import { ChangeEvent, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

// components
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Input } from '../Input/Input'
import { PersonSpendsCard } from './PersonSpendsCard/PersonSpendsCard'

// hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// styles
import styles from './ShareExpense.module.scss'

export type ExpenseProps = {
  name: string
  payers: PayerProps[]
}

export type PayerProps = {
  name: string
  spends: SpendProps[]
}

export type SpendProps = {
  name: string
  cost: number
}

export const ShareExpense = (): JSX.Element => {
  const [payers, setPayers] = useState<PayerProps[]>([])
  const [payerName, setPayerName] = useState('')
  const [expensesData, setExpensesData] = useLocalStorage<ExpenseProps[]>('expenses-data', [])

  const expenseNameInputRef = useRef('Gasto')

  function onChangeExpenseName(event: ChangeEvent<HTMLInputElement>) {
    const expenseName = event.target.value

    expenseNameInputRef.current = expenseName
  }

  function onChangePayerName(event: ChangeEvent<HTMLInputElement>) {
    const payerName = event.target.value

    setPayerName(payerName)
  }

  function onAddPayer() {
    if (!payerName) return

    const payerRepeated = payers.some((payer) => payer.name === payerName)

    if (!payerRepeated) {
      const newPayer = {
        name: payerName.trim(),
        spends: [],
      }

      const newPayers = [...payers, newPayer]

      setPayers(newPayers)

      setPayerName('')
    }
  }

  function deletePayer(indexPerson: number) {
    const newPayers = payers.filter((_, index) => index !== indexPerson)

    setPayers(newPayers)
  }

  function onStartCalculate() {
    const expenseName = expenseNameInputRef.current ? expenseNameInputRef.current : `Gastos ${payers.length}` //improve in future

    const dataPayers = payers.map((name) => {
      return {
        name,
        spend: [],
      }
    })

    const expenses = {
      name: expenseName,
      payers: dataPayers,
    }

    const newData = [...expensesData, expenses]

    // setExpensesData(newData)
  }

  return (
    <Container title="Divisão de gastos">
      <div className={styles.container}>
        <section className={styles.addPayer}>
          <section>
            <Input onChange={onChangeExpenseName} label="Descrição despesa" placeholder="Despesa" />
          </section>

          <section>
            <Input onChange={onChangePayerName} label="Nome pessoa" placeholder="Nome" value={payerName} />

            <Button text="Acidicionar pessoa" onClick={onAddPayer} type="button" />
          </section>
        </section>
        <section>
          <ul>
            {payers.map((payer, index) => {
              return (
                <PersonSpendsCard
                  key={index}
                  index={index}
                  payer={payer}
                  payers={payers}
                  deletePayer={deletePayer}
                  setPayers={setPayers}
                />
              )
            })}
          </ul>
        </section>

        <Button text="Calcular" onClick={onStartCalculate} />
      </div>
    </Container>
  )
}
