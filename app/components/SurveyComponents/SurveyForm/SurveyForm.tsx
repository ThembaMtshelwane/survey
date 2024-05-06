'use client'

import styles from './surveyform.module.css'
import { useFormState } from 'react-dom'
import { FormSubmitAction } from '@/app/actions/actions'
import SubmitButton from '../../SubmitButton/SubmitButton'
import { useEffect, useRef, useState } from 'react'
import personalStyles from '../../FormInputs/Personal/personal.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import FoodInputs from '../../FormInputs/Food/FoodInputs'
import ActivityInputs from '../../FormInputs/Activity/ActivityInputs'
import { MAX_AGE, MIN_AGE } from '@/app/lib/data'

type Props = {}
const SurveyForm = (props: Props) => {
  const [state, FormAction] = useFormState(FormSubmitAction, '')
  const formRef = useRef<HTMLFormElement>(null)
  const [errorMessages, setErrorMessages] = useState<string>('')
  const [errorState, setErrorState] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
      setErrorState(false)
      setSelectedDate(undefined)
    } else {
      setErrorMessages(state.message)
      setErrorState(true)
    }
  }, [state])

  return (
    <form ref={formRef} action={FormAction} className={styles.formContainer}>
      <section className={personalStyles.personalDetailsContainer}>
        <section className={personalStyles.leftSection}>
          Personal Details:
        </section>
        <section className={personalStyles.rightSection}>
          <label htmlFor="fullNames">Full Names</label>
          <input
            type="text"
            name="fullNames"
            required
            className={`${personalStyles.inputs} ${personalStyles.textInputs}`}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            className={`${personalStyles.inputs} ${personalStyles.textInputs}`}
          />

          <label htmlFor="birthDate">Date of Birth</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            name="birthDate"
            className={`${personalStyles.dateInput} `}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={MAX_AGE}
            required
            minDate={
              new Date(
                `${
                  new Date().getFullYear() - MAX_AGE
                }-${new Date().getMonth()}-${new Date().getDate()}`
              )
            }
            maxDate={
              new Date(
                `${
                  new Date().getFullYear() - MIN_AGE
                }-${new Date().getMonth()}-${new Date().getDate()}`
              )
            }
          />
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            required
            className={`${personalStyles.inputs} ${personalStyles.textInputs}`}
          />
        </section>
      </section>
      <section className={styles.errorMessage}>
        {errorState ? errorMessages : ''}
      </section>
      <FoodInputs />
      <ActivityInputs />
      <SubmitButton />
    </form>
  )
}
export default SurveyForm
