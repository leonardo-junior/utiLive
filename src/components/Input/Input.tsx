// vendors
import { ChangeEvent } from 'react'

// styles
import styles from './Input.module.scss'

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder: string
}

export const Input = ({ onChange, placeholder, label }: InputProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}

      <input className={styles.footer} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}
