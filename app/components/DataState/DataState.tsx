import styles from './datastate.module.css'

type Props = {
  message: string
}
const DataState = ({ message }: Props) => {
  return (
    <section className={styles.messageContainer}>
      <p className={styles.content}>{message}</p>
    </section>
  )
}
export default DataState
