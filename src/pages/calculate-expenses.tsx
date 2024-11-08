// components
import { Layout } from '../components/Layout/Layout'
import { ShareExpense } from '../components/ShareExpense/ShareExpense'

function ShareExpensesPage(): JSX.Element {
  return (
    <Layout title="Divisão gastos" description="Utilitário de divisão de gastos">
      <ShareExpense />
      <div>ot</div>
    </Layout>
  )
}

export default ShareExpensesPage
