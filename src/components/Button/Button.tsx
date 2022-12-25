// styles
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  text?: string
  children?: JSX.Element
  icon?: boolean
  iconClean?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ text, children, icon = false, iconClean, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx({
        [styles.button]: true,
        [styles.icon]: icon,
        [styles.iconClean]: iconClean,
      })}
      {...props}
    >
      {text && text}

      {children && children}
    </button>
  )
}
