import { Button } from './components/ui/Button'
import { Container } from './components/ui/Container'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <main className={styles.shell}>
        <Container>
          <div className={styles.panel}>
            <p className={styles.eyebrow}>Снэпбилд</p>
            <h1 className={styles.title}>
              Платформа, где всё создаётся в рамках вашего бренда
            </h1>
            <p className={styles.subtitle}>
              Подключите дизайн-систему, чтобы команда собирала сайты,
              изображения и презентации в фирменном стиле за минуты.
            </p>
            <div className={styles.actions}>
              <Button href="#demo" variant="secondary">
                Запросить демо
              </Button>
              <Button href="#product" variant="primary">
                Смотреть продукт
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}

export default App
