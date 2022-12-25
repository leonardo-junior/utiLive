// components
import { ChangeEvent, useRef, useState } from 'react'

// hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { Container } from '../Container/Container'

// styles
import styles from './ShareExpenses.module.scss'

type SpendProps = {
  name: string
  cost: number
}

type PayerProps = {
  name: string
  spends: SpendProps[]
}

type ExpenseProps = {
  name: string
  payers: PayerProps[]
}

export const ShareExpenses = (): JSX.Element => {
  const [payers, setPayers] = useState<PayerProps[]>([])
  const [expensesData, setExpensesData] = useLocalStorage<ExpenseProps[]>('expenses-data', [])

  const expenseNameInputRef = useRef('Gasto')
  const payerNameInputRef = useRef('')
  const nameCostInputRef = useRef('')
  const valueCostInputRef = useRef(0)

  const elInputRef = useRef<HTMLInputElement>(null)

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

      if (elInputRef.current) {
        elInputRef.current.value = ''
      }
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
      <>
        <section>
          <h2>O que calcular</h2>

          <input onChange={onChangeExpenseName} placeholder="Gastos" />
        </section>

        <section>
          <h3>Nome da pessoa pra divisão</h3>

          <ul>
            {payers.map((payer, index) => {
              return (
                <li key={index}>
                  <div>
                    <span>{payer.name}</span>
                    <button onClick={() => deletePayer(index)}>X</button>
                  </div>

                  <div>
                    <input type="text" onChange={onChangeNameCost} />

                    <input type="number" onChange={onChangeValueCost} />

                    <button onClick={() => onAddCost(index)}>Adicionar</button>
                  </div>

                  <ul>
                    {payer.spends.map((val, index) => {
                      console.log(val.name)
                      return <span key={index}>{val.name}</span>
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>

          <input ref={elInputRef} onChange={onChangePayerName} placeholder="Nome pessoa" />

          <button type="button" onClick={onAddPeople}>
            Adicionar pessoa
          </button>
        </section>
        <button onClick={onStartCalculate}>Começar cálculo</button>
      </>
    </Container>
  )
}
