// components
import { Layout } from '../components/Layout/Layout'
import { Pomodoro } from '../components/Pomodoro/Pomodoro'

function PomodoroPage(): JSX.Element {
  return (
    <Layout title="Pomodoro" description="Temporizador pomodoro">
      <Pomodoro />
    </Layout>
  )
}

export default PomodoroPage
