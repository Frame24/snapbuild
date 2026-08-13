import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Logos } from './components/sections/Logos'
import { Process } from './components/sections/Process'
import { UseCases } from './components/sections/UseCases'
import { Compare } from './components/sections/Compare'
import { Security } from './components/sections/Security'
import { Roadmap } from './components/sections/Roadmap'
import { Faq } from './components/sections/Faq'
import { Cta } from './components/sections/Cta'
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
        <Compare />
        <Security />
        <Roadmap />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

export default App
