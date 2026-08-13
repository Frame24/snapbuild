import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Logos } from './components/sections/Logos'
import { Process } from './components/sections/Process'
import { UseCases } from './components/sections/UseCases'
import { Scenarios } from './components/sections/Scenarios'
import { Compare } from './components/sections/Compare'
import { Pricing } from './components/sections/Pricing'
import { Security } from './components/sections/Security'
import { Integrations } from './components/sections/Integrations'
import { Roadmap } from './components/sections/Roadmap'
import { Testimonials } from './components/sections/Testimonials'
import { Faq } from './components/sections/Faq'
import { DemoForm } from './components/sections/DemoForm'
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
        <Scenarios />
        <Compare />
        <Pricing />
        <Security />
        <Integrations />
        <Roadmap />
        <Testimonials />
        <Faq />
        <DemoForm />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

export default App
