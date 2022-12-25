// components
import { Layout } from '../components/Layout/Layout'
import { Home } from '../components/Home/Home'

function HomePage(): JSX.Element {
  return (
    <Layout title="Home Page" description="Página principal">
      <Home />
    </Layout>
  )
}

export default HomePage
