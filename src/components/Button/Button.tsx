// styles
import clsx from 'clsx'
import styles from './Button.module.scss'

type ButtonProps = {
  text?: string
  children?: JSX.Element
  icon?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({ text, children, icon = false, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx({
        [styles.button]: true,
        [styles.icon]: icon,
      })}
      {...props}
    >
      {text && text}

      {children && children}
    </button>
  )
}
