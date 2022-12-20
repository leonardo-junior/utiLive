// vendors
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

// styles
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
