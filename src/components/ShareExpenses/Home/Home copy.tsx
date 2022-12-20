// components
import { ChangeEvent, useRef, useState } from 'react'

// hooks
import useLocalStorage from '../../../hooks/useLocalStorage'

// styles
import styles from './Home.module.scss'

type SpendProps = {
  spendName: string
  cost: number
}

type PayerProps = {
  name: string
  spend: SpendProps[]
}

type ExpenseProps = {
  name: string
  payers: PayerProps[]
}

function Home(): JSX.Element {
  const [payers, setPayers] = useState<string[]>([])
  const [expensesData, setExpensesData] = useLocalStorage<ExpenseProps[]>('expenses-data', [])

  const expenseNameInputRef = useRef('')
  const payerNameInputRef = useRef('')

  const elInputRef = useRef<HTMLInputElement>(null)

  function onChangeExpenseName(event: ChangeEvent<HTMLInputElement>) {
    const expenseName = event.target.value

    expenseNameInputRef.current = expenseName
  }

  function onChangePayerName(event: ChangeEvent<HTMLInputElement>) {
    const payerName = event.target.value

    payerNameInputRef.current = payerName
  }

  function onAddPeople() {
    if (!payerNameInputRef.current) return

    if (!payers.includes(payerNameInputRef.current)) {
      const payerName = payerNameInputRef.current.trim()
      const newPayers = [...payers, payerName]

      setPayers(newPayers)

      if (elInputRef.current) {
        elInputRef.current.value = ''
      }
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

    setExpensesData(newData)
  }

  return (
    <main className={styles.container}>
      <section>
        <h1>O que calcular</h1>

        <input onChange={onChangeExpenseName} placeholder="Nome do cálculo" />
      </section>

      <section>
        <h1>Nome da pessoa pra divisão</h1>

        <ul>
          {payers.map((name, index) => {
            return (
              <li key={index}>
                <div>
                  <span>{name}</span>
                  <button onClick={() => deletePayer(index)}>X</button>
                </div>

                <ul></ul>
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
    </main>
  )
}

export default Home

// const Example = {
//   ['março']: [
//     {
//       name: 'Natiele',
//       despesas: [
//         { costName: 'agua', cost: 80 },
//         { costName: 'energia', cost: 200 },
//       ],
//     },
//     {
//       name: 'leonardo',
//       despesas: [
//         { costName: 'gas', cost: 10 },
//         { costName: 'compras', cost: 400 },
//       ],
//     },
//   ],
//   ['abril']: [
//     {
//       name: 'Natiele',
//       despesas: [
//         { costName: 'agua', cost: 80 },
//         { costName: 'energia', cost: 200 },
//       ],
//     },
//     {
//       name: 'leonardo',
//       despesas: [
//         { costName: 'gas', cost: 10 },
//         { costName: 'compras', cost: 400 },
//       ],
//     },
//   ],
// }

// const testeAriel = Example['março'].find(name => name.name ==='leonardo')?.despesas
