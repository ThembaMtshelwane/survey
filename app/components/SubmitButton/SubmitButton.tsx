'use client'

import { useFormStatus } from 'react-dom'
import styles from './submitbutton.module.css'

type Props = {}
const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus()
  return (
    <input
      disabled={pending}
      type="submit"
      value={pending ? 'Submitting...' : 'Submit'}
      className={styles.button} 
    />
  )
}
export default SubmitButton
