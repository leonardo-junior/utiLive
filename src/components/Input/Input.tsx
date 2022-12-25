// vendors
import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

// styles
import styles from './Input.module.scss'

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ onChange, placeholder, label, type = 'text', ...props }: InputProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}

      <input type={type} className={styles.footer} onChange={onChange} placeholder={placeholder} {...props} />
    </div>
  )
}
