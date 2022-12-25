// vendors
import { ChangeEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

// components
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { Payer } from '../ShareExpense'

// styles
import styles from './PersonSpendsCard.module.scss'

type PersonSpendsCardProps = {
  index: number
  payer: Payer
  payers: Payer[]
  deletePayer: (index: number) => void
  setPayers: (payers: Payer[]) => void
}

export const PersonSpendsCard = ({
  payer,
  index,
  payers,
  setPayers,
  deletePayer,
}: PersonSpendsCardProps): JSX.Element => {
  const [nameCost, setNameCost] = useState('')
  const [valueCost, setValueCost] = useState(0)

  function onChangeNameCost(event: ChangeEvent<HTMLInputElement>) {
    const nameCost = event.target.value

    setNameCost(nameCost)
  }

  function onChangeValueCost(event: ChangeEvent<HTMLInputElement>) {
    const valueCost = +event.target.value

    setValueCost(valueCost)
  }

  function onAddCost(index: number) {
    const payer = payers[index]

    const newSpend = {
      name: nameCost,
      cost: valueCost,
    }

    payer.spends.push(newSpend)
    payer.total = payer.total + valueCost

    const newPayers = payers
    newPayers[index] = payer

    setPayers(newPayers)

    setNameCost('')
    setValueCost(0)

    console.log(payers)
  }

  return (
    <li key={index} className={styles.content}>
      <div className={styles.payerName}>
        <span>{payer.name}</span>

        <Button iconClean onClick={() => deletePayer(index)}>
          <FaTimes />
        </Button>
      </div>

      <div className={styles.addSpend}>
        <div>
          <Input onChange={onChangeNameCost} label="Nome do gasto" value={nameCost} />

          <Input type="number" onChange={onChangeValueCost} label="Valor" value={valueCost} />
        </div>

        <Button text="Adicionar gasto" onClick={() => onAddCost(index)} />
      </div>

      <ul>
        {payer.spends.map((spend, index) => {
          return (
            <li key={index}>
              {spend.name} - {spend.cost}
            </li>
          )
        })}
      </ul>
    </li>
  )
}
