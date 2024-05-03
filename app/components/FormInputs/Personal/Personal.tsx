import { useState } from 'react'
import styles from './personal.module.css'
import { MAX_AGE, MIN_AGE } from '@/app/lib/data'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {}
const PersonalInput = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  return (
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
  )
}
export default PersonalInput
