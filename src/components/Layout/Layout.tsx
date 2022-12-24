// vendors
import Head from 'next/head'

// components
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'

// styles
import styles from './Layout.module.scss'

type LayoutProps = {
  children: React.ReactNode
  title: string
  description: string
  canonical?: string
}

export const Layout = ({ children, title, description, canonical }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles.container}>
        <Header />

        <main className={styles.content}>{children}</main>

        <Footer />
      </div>
    </>
  )
}
