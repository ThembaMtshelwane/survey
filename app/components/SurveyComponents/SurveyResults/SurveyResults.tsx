'use client'

import { getData } from '@/app/actions/actions'
import { useEffect, useState } from 'react'

type Props = {}
const SurveyResults = (props: Props) => {
  const [allUsersData, setAllUsersData] = useState()
  useEffect(() => {
    const fd = async () => {
      const data = await getData()
      setAllUsersData(data)
    }
    fd()
  }, [])
  console.log('all user data', allUsersData)

  return <div>SurveyResults</div>
}
export default SurveyResults
