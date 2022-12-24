// vendors
import { useState } from 'react'

// components
import { Layout } from '../components/Layout/Layout'
import { Expense } from '../components/ShareExpenses/Expense/Expense'
import { Home } from '../components/ShareExpenses/Home/Home'

function ShareExpenses(): JSX.Element {
  const [showFirstInfo, setShowFirstInfo] = useState(true)
  const [showCaculate, setShowCalculate] = useState(false)
  const [showResult, setShowResult] = useState(false)

  function showInfos() {
    setShowFirstInfo(true)
    setShowCalculate(false)
    setShowResult(false)
  }

  function showCalculate() {
    setShowFirstInfo(false)
    setShowCalculate(true)
    setShowResult(false)
  }

  function showResults() {
    setShowFirstInfo(false)
    setShowCalculate(false)
    setShowResult(true)
  }

  return (
    <Layout title="Divisão gastos" description="Arquitetura de divisão de gastos">
      <button onClick={showInfos}>first</button>
      <button onClick={showCalculate}>Second</button>
      <button onClick={showResults}>Third</button>
      {showFirstInfo && <Home />}

      {showCaculate && <Expense />}

      {/* {showResult && <ResultCard />} */}
    </Layout>
  )
}

export default ShareExpenses
