import styles from './food.module.css'

type Props = {}
const FoodInputs = (props: Props) => {
  return (
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
  )
}
export default FoodInputs