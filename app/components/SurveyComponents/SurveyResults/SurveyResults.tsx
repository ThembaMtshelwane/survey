'use client'

import { getData } from '@/app/actions/actions'
import { AgeStats, AllUsersInfo } from '@/app/lib/definitions'
import { getAgeStatistic } from '@/app/utils/utils'
import { useEffect, useState } from 'react'

type Props = {}
const SurveyResults = (props: Props) => {
  const [allUsersData, setAllUsersData] = useState<AllUsersInfo>()
  const [ageStatistics, setAgeStatistics] = useState<AgeStats>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setAllUsersData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (allUsersData) {
      const statistics = getAgeStatistic(allUsersData.usersBirthYears)
      setAgeStatistics(statistics)
    }
  }, [allUsersData])

  return (
    <div>
      {ageStatistics ? (
        <div>
          <div>Oldest: {ageStatistics.oldest}</div>
          <div>Youngest: {ageStatistics.youngest}</div>
          <div>Average: {ageStatistics.average}</div>
        </div>
      ) : allUsersData ? (
        <div>Loading...</div>
      ) : (
        <div>No Surveys</div>
      )}
    </div>
  )
}
export default SurveyResults
