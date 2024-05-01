import { Suspense } from 'react'
import SurveyForm from './components/SurveyComponents/SurveyForm/SurveyForm'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback="Loading..">
        <SurveyForm />
      </Suspense>
    </main>
  )
}
