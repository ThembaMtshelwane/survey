'use client'

import { getData } from '@/app/actions/actions'
import { AgeStats, AllUsersInfo, FoodData } from '@/app/lib/definitions'
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
  const [foodStatistics, setFoodStatistics] = useState<FoodData[]>()
  const [activityStatistics, setActivityStatistics] = useState<FoodData>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setAllUsersData(data)
    }
    fetchData()
  }, [])

  console.log(allUsersData)

  useEffect(() => {
    if (allUsersData) {
      const ages = getAgeStatistic(allUsersData.usersBirthYears)
      setAgeStatistics(ages)

      const food = getFoodStatistics(allUsersData.usersFoodPreferences)
      setFoodStatistics(food)

      // const activities = getActivityStatistics(
      //   allUsersData.usersActivityRatings,
      //   allUsersData.numOfSurveys
      // )
      // setActivityStatistics(activities)
    }
  }, [allUsersData])

  return (
    <div>
      {ageStatistics && foodStatistics ? (
        <div>
          <div>
            <div>Oldest: {ageStatistics.oldest}</div>
            <div>Youngest: {ageStatistics.youngest}</div>
            <div>Average: {ageStatistics.average}</div>
          </div>
          <div>
            {foodStatistics.map((food) => (
              <div key={food.foodItem}>
                {food.foodItem}: {food.percentage}%
              </div>
            ))}
          </div>
          <div>
            {/* {Object.keys(activityStatistics).map((activity) => (
              <div key={activity}>
                {activity}: {activityStatistics[activity]}
              </div>
            ))} */}
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
