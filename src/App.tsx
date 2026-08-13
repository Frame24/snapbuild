import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Logos } from './components/sections/Logos'
import { Process } from './components/sections/Process'
import { UseCases } from './components/sections/UseCases'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Logos />
        <Process />
        <UseCases />
      </main>
      <Footer />
    </div>
  )
}

export default App
