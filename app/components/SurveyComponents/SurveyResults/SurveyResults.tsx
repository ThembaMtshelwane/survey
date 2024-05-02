'use client'

import { getData } from '@/app/actions/actions'
import { AgeStats, AllUsersInfo, StatData } from '@/app/lib/definitions'
import {
  getActivityStatistics,
  getAgeStatistic,
  getFoodStatistics,
} from '@/app/utils/utils'
import { useEffect, useState } from 'react'

type Props = {}
const SurveyResults = (props: Props) => {
  const [allUsersData, setAllUsersData] = useState<AllUsersInfo>()
  const [ageStatistics, setAgeStatistics] = useState<AgeStats>()
  const [foodStatistics, setFoodStatistics] = useState<StatData[]>()
  const [activityStatistics, setActivityStatistics] = useState<StatData[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setAllUsersData(data)
    }
    fetchData()
  }, [])

  // console.log(allUsersData)

  useEffect(() => {
    if (allUsersData) {
      const ages = getAgeStatistic(allUsersData.usersBirthYears)
      setAgeStatistics(ages)

      const food = getFoodStatistics(
        allUsersData.usersFoodPreferences,
        allUsersData.numOfSurveys
      )
      setFoodStatistics(food)

      const activities = getActivityStatistics(
        allUsersData.usersActivityRatings,
        allUsersData.numOfSurveys
      )
      // console.log('activities', activities)

      setActivityStatistics(activities)
    }
  }, [allUsersData])

  return (
    <div>
      {ageStatistics && foodStatistics && activityStatistics ? (
        <div>
          <div>
            <div>Oldest: {ageStatistics.oldest}</div>
            <div>Youngest: {ageStatistics.youngest}</div>
            <div>Average: {ageStatistics.average}</div>
          </div>
          <div>
            {foodStatistics.map((food) => (
              <div key={food.label}>
                {food.label}: {food.value}%
              </div>
            ))}
          </div>
          <div>
            {activityStatistics.map((activity) => (
              <div key={activity.label}>
                {activity.label}: {activity.value}
              </div>
            ))}
          </div>
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
