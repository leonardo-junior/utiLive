// components
import { Layout } from '../components/Layout/Layout'
import { ShareExpenses } from '../components/ShareExpenses/ShareExpenses'

function ShareExpensesPage(): JSX.Element {
  return (
    <Layout title="Divisão gastos" description="Utilitário de divisão de gastos">
      <ShareExpenses />
    </Layout>
  )
}

export default ShareExpensesPage
