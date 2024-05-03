'use client'

import styles from './surveyform.module.css'
import { useFormState } from 'react-dom'
import { FormSubmitAction } from '@/app/actions/actions'
import SubmitButton from '../../SubmitButton/SubmitButton'
import { useEffect, useRef, useState } from 'react'
import PersonalInput from '../../FormInputs/Personal/Personal'
import FoodInputs from '../../FormInputs/Food/FoodInputs'
import ActivityInputs from '../../FormInputs/Activity/ActivityInputs'

type Props = {}
const SurveyForm = (props: Props) => {
  const [state, FormAction] = useFormState(FormSubmitAction, '')
  const formRef = useRef<HTMLFormElement>(null)
  const [errorMessages, setErrorMessages] = useState<string>('')
  const [errorState, setErrorState] = useState<boolean>(false)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
      setErrorState(false)
    } else {
      setErrorMessages(state.message)
      setErrorState(true)
    }
  }, [state])

  return (
    <form ref={formRef} action={FormAction} className={styles.formContainer}>
      <PersonalInput />
      <section className={styles.errorMessage}>
        {errorState ? errorMessages : ''}
      </section>
      <FoodInputs />
      <ActivityInputs />
      <section className={styles.buttonContainer}>
        <SubmitButton />
      </section>
      {/* <FormMessage message ={state.message}/> */}
    </form>
  )
}
export default SurveyForm
