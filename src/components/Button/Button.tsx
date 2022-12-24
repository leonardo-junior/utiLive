// styles
import styles from './Button.module.scss'

type ButtonProps = {
  text?: string
  children?: JSX.Element
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({ text, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={styles.button} {...props}>
      {text && text}

      {children && children}
    </button>
  )
}
