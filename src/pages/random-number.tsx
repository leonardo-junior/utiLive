// components
import Layout from '../components/Layout/Layout'
import Random from '../components/Random/Random'

function RandomPage(): JSX.Element {
  return (
    <Layout title="Sorteio números" description="Utilitário para sortear números aleatórios">
      <Random />
    </Layout>
  )
}

export default RandomPage
