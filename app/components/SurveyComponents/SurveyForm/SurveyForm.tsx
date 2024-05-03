'use client'

import { activities, MAX_AGE, MIN_AGE } from '@/app/lib/data'
import styles from './surveyform.module.css'
import { useFormState, useFormStatus } from 'react-dom'
import { FormSubmitAction } from '@/app/actions/actions'
import SubmitButton from '../../SubmitButton/SubmitButton'
import { useEffect, useRef, useState } from 'react'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
    } else {
      setErrorMessages(state.message)
      setErrorState(true)
    }
  }, [state])

  return (
    <form ref={formRef} action={FormAction} className={styles.formContainer}>
      <section className={styles.personalDetailsContainer}>
        <section className={styles.leftSection}>Personal Details:</section>
        <section className={styles.rightSection}>
          <label htmlFor="fullNames">Full Names</label>
          <input
            type="text"
            name="fullNames"
            required
            className={`${styles.inputs} ${styles.textInputs}`}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            className={`${styles.inputs} ${styles.textInputs}`}
          />

          <label htmlFor="birthDate">Date of Birth</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            name="birthDate"
            className={`${styles.dateInput} `}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={MAX_AGE}
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
            className={`${styles.inputs} ${styles.textInputs}`}
          />
        </section>
      </section>
      <section className={styles.errorMessage}>
        {errorState ? errorMessages : ''}
      </section>
      <section className={styles.foodContainer}>
        <p className={styles.foodQuestion}> What is your favorite food?</p>
        <ul className={styles.foodOptions}>
          <li key="pizza" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              value="pizza"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="pizza">Pizza</label>
          </li>

          <li key="pasta" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              value="pasta"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="Pasta">Pasta</label>
          </li>
          <li key="papAndWors" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              value="papAndWors"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="papAndWors">Pap and Wors</label>
          </li>
          <li key="other" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              value="other"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="other">Other</label>
          </li>
        </ul>
      </section>
      <section className={styles.activitiesContainer}>
        <p className={styles.tableInstructions}>
          Please rate your level of agreement on a scale from 1 to 5, with 1
          being &quot;strongly agree&quot; and 5 being &quot;strongly
          disagree&quot;.
        </p>
        <section className={styles.tableSection}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableRows}>
                <th className={styles.tableHeadings}> </th>
                <th className={styles.tableHeadings}>Strongly Agree</th>
                <th className={styles.tableHeadings}>Agree</th>
                <th className={styles.tableHeadings}>Neutral</th>
                <th className={styles.tableHeadings}>Disagree</th>
                <th className={styles.tableHeadings}>Strongly Disagree</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {activities.map((item) => (
                <tr className={styles.tableRows} key={item.id}>
                  <td className={styles.tableDataPointQuestion}>
                    {item.activity}
                  </td>
                  <td className={styles.tableDataPointInput}>
                    <input
                      type="radio"
                      value={1}
                      className={styles.radioInputs}
                      name={item.id}
                      required
                    />
                  </td>
                  <td className={styles.tableDataPointInput}>
                    <input
                      type="radio"
                      value={2}
                      className={styles.radioInputs}
                      name={item.id}
                      required
                    />
                  </td>
                  <td className={styles.tableDataPointInput}>
                    <input
                      type="radio"
                      value={3}
                      className={styles.radioInputs}
                      name={item.id}
                      required
                    />
                  </td>
                  <td className={styles.tableDataPointInput}>
                    <input
                      type="radio"
                      value={4}
                      className={styles.radioInputs}
                      name={item.id}
                      required
                    />
                  </td>
                  <td className={styles.tableDataPointInput}>
                    <input
                      type="radio"
                      value={5}
                      className={styles.radioInputs}
                      name={item.id}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
      <section className={styles.buttonContainer}>
        <SubmitButton />
      </section>
      {/* <FormMessage message ={state.message}/> */}
    </form>
  )
}
export default SurveyForm
