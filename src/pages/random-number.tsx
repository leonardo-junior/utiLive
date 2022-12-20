// components
import Layout from '../components/Layout/Layout'
import Random from '../components/Random/Random'

function RandomPage (): JSX.Element {
  return (
    <Layout title='Sorteio numero' description='A simple page'>
      <Random />
    </Layout>
  )
}

export default RandomPage
