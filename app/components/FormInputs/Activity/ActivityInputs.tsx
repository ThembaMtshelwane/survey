import { activities } from '@/app/lib/data'
import styles from './activity.module.css'

type Props = {}
const ActivityInputs = (props: Props) => {
  return (
    <section className={styles.activitiesContainer}>
      <p className={styles.tableInstructions}>
        Please rate your level of agreement on a scale from 1 to 5, with 1 being
        &quot;strongly agree&quot; and 5 being &quot;strongly disagree&quot;.
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
  )
}
export default ActivityInputs
