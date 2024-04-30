import styles from './surveyform.module.css'

type Props = {}
const SurveyForm = (props: Props) => {
  return (
    <form className={styles.formContainer}>
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
          <input
            type="date"
            name="birthDate"
            required
            className={`${styles.inputs} ${styles.textInputs}`}
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
      <section className={styles.food}>
        <p className={styles.foodQuestion}> What is your favorite food</p>
        <ul className={styles.foodOptions}>
          <li key="pizza" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="pizza">Pizza</label>
          </li>

          <li key="pasta" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="Pasta">Pasta</label>
          </li>
          <li key="papAndWors" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="papAndWors">Pap and Wors</label>
          </li>
          <li key="other" className={styles.foodOption}>
            <input
              type="checkbox"
              name="foodItem"
              className={`${styles.inputs} ${styles.checkboxInputs}`}
            />
            <label htmlFor="other">Other</label>
          </li>
        </ul>
      </section>
      <section className={styles.activities}>
        <p className={styles.tableInstructions}>
          Please rate your level of agreement on a scale from 1 to 5, with 1
          being strongly agree and 5 being strongly disagree.
        </p>
      </section>
    </form>
  )
}
export default SurveyForm
