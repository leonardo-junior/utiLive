import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
