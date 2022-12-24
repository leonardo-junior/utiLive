// styles
import styles from './Container.module.scss'

type ContainerProps = {
  title: string
  children: JSX.Element
}

export const Container = ({ title, children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>

      {children}
    </div>
  )
}
