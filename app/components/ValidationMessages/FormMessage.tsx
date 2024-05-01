import styles from './formmessage.module.css'

type Props = {
  message: string
}
const FormMessage = ({ message }: Props) => {
  return (
    <section className={styles.messageContainer}>
      <p>{message}</p>
    </section>
  )
}
export default FormMessage
