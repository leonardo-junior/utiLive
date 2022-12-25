// vendors
import { ChangeEvent, useRef, useState } from 'react'

// components
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Input } from '../Input/Input'

// hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// styles
import styles from './ShareExpense.module.scss'

export type SpendProps = {
  name: string
  cost: number
}

export type PayerProps = {
  name: string
  spends: SpendProps[]
}

export type ExpenseProps = {
  name: string
  payers: PayerProps[]
}

export const ShareExpense = (): JSX.Element => {
  const [payers, setPayers] = useState<PayerProps[]>([])
  const [expensesData, setExpensesData] = useLocalStorage<ExpenseProps[]>('expenses-data', [])

  const expenseNameInputRef = useRef('Gasto')
  const payerNameInputRef = useRef('')
  const nameCostInputRef = useRef('')
  const valueCostInputRef = useRef(0)

  function onChangeExpenseName(event: ChangeEvent<HTMLInputElement>) {
    const expenseName = event.target.value

    expenseNameInputRef.current = expenseName
  }

  function onChangePayerName(event: ChangeEvent<HTMLInputElement>) {
    const payerName = event.target.value

    payerNameInputRef.current = payerName
  }

  function onChangeNameCost(event: ChangeEvent<HTMLInputElement>) {
    const nameCost = event.target.value

    nameCostInputRef.current = nameCost
  }

  function onChangeValueCost(event: ChangeEvent<HTMLInputElement>) {
    const valueCost = +event.target.value

    valueCostInputRef.current = valueCost
  }

  function onAddPeople() {
    if (!payerNameInputRef.current) return

    const payerRepeated = payers.some((payer) => payer.name === payerNameInputRef.current)

    if (!payerRepeated) {
      const payerName = payerNameInputRef.current.trim()

      const newPayer = {
        name: payerName,
        spends: [],
      }

      const newPayers = [...payers, newPayer]

      setPayers(newPayers)
    }
  }

  function onAddCost(index: number) {
    const nameCost = nameCostInputRef.current
    const valueCost = valueCostInputRef.current

    const payer = payers[index]

    const newSpend = {
      name: nameCost,
      cost: valueCost,
    }

    payer.spends.push(newSpend)

    const newPayers = payers
    newPayers[index] = payer

    setPayers(newPayers)

    nameCostInputRef.current = ''
    valueCostInputRef.current = 0

    console.log(payers)
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
        <section>
          <Input onChange={onChangeExpenseName} label="Descrição despesa" placeholder="Despesa" />
        </section>

        <section>
          <Input onChange={onChangePayerName} label="Nome pessoa" placeholder="Nome" />

          <Button text="Acidicionar pessoa" onClick={onAddPeople} type="button" />
        </section>

        <section>
          <ul>
            {payers.map((payer, index) => {
              return (
                <li key={index}>
                  <div>
                    <span>{payer.name}</span>

                    <button onClick={() => deletePayer(index)}>X</button>
                  </div>

                  <div>
                    <Input onChange={onChangeNameCost} placeholder={'Nome do gasto'} />

                    <Input type="number" onChange={onChangeValueCost} placeholder={'Valor'} />

                    <button onClick={() => onAddCost(index)}>Adicionar</button>
                  </div>

                  <ul>
                    {payer.spends.map((val, index) => {
                      return <li key={index}>{val.name}</li>
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </section>

        <Button text="Calcular" onClick={onStartCalculate} />
      </div>
    </Container>
  )
}
