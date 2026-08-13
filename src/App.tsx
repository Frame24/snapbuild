import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Hero />
        {/* Место для следующих секций лендинга */}
        <div className={styles.spacer} aria-hidden="true" />
      </main>
      <Footer />
    </div>
  )
}

export default App
