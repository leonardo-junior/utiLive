// vendors
import clsx from 'clsx'
import Link from 'next/link'

// styles
import styles from './Card.module.scss'

type CardProps = Omit<React.AllHTMLAttributes<HTMLDivElement>, 'className'> & {
  anchor: string
  keyName: string
  image?: string
  className?: string
}

export const Card = ({ anchor, keyName, image, className = '', ...props }: CardProps): JSX.Element => {
  return (
    <Link href={anchor}>
      <div
        className={clsx({
          [styles.container]: true,
          [className]: !!className,
        })}
        {...props}
      >
        <section className={styles.overlay} />

        {image && <img src={image} />}

        <div className={styles.title}>{keyName}</div>
      </div>
    </Link>
  )
}
