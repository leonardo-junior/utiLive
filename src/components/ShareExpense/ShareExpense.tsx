// vendors
import { ChangeEvent, useState } from 'react'

// components
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Input } from '../Input/Input'
import { PersonSpendsCard } from './PersonSpendsCard/PersonSpendsCard'

// hooks
// import useLocalStorage from '../../hooks/useLocalStorage'

// styles
import styles from './ShareExpense.module.scss'

export type Expense = {
  name: string
  payers: Payer[]
}

export type Payer = {
  name: string
  spends: Spend[]
  total: number
}

export type Spend = {
  name: string
  cost: number
}

type FinalValue = {
  name: string
  finalValue: number
}

// TODO add in localStorage with name of expense

export const ShareExpense = (): JSX.Element => {
  const [payers, setPayers] = useState<Payer[]>([])
  const [payerName, setPayerName] = useState('')
  const [expensesData, setExpensesData] = useState<FinalValue[]>([])

  // const [expensesData, setExpensesData] = useLocalStorage<ExpenseProps[]>('expenses-data', [])

  // const expenseNameInputRef = useRef('Gasto')

  // function onChangeExpenseName(event: ChangeEvent<HTMLInputElement>) {
  //   const expenseName = event.target.value

  //   expenseNameInputRef.current = expenseName
  // }

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
        total: 0,
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
    const total = payers.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0)
    const valuePerPerson = total / payers.length

    const finalValues = payers.map((val) => ({
      name: val.name,
      finalValue: val.total - valuePerPerson,
    }))

    setExpensesData(finalValues)
  }

  return (
    <Container title="Divisão de gastos">
      <div className={styles.container}>
        <section className={styles.addPayer}>
          {/* <section>
            <Input onChange={onChangeExpenseName} label="Descrição despesa" placeholder="Despesa" />
          </section> */}

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

        <section>
          <ul>
            {expensesData.map((expenseFinal, index) => (
              <li key={index} className={styles.finalValue}>
                {expenseFinal.finalValue > 0
                  ? `Repassar ${expenseFinal.finalValue}`
                  : `Receber ${expenseFinal.finalValue * -1}`}
              </li>
            ))}
          </ul>
        </section>

        <Button text="Calcular" onClick={onStartCalculate} />
      </div>
    </Container>
  )
}
