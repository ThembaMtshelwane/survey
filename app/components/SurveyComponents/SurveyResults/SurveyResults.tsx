'use client'

import { getData } from '@/app/actions/actions'
import { AgeStats, AllUsersInfo, FoodData } from '@/app/lib/definitions'
import { getAgeStatistic, getFoodStatistics } from '@/app/utils/utils'
import { useEffect, useState } from 'react'

type Props = {}
const SurveyResults = (props: Props) => {
  const [allUsersData, setAllUsersData] = useState<AllUsersInfo>()
  const [ageStatistics, setAgeStatistics] = useState<AgeStats>()
  const [foodStatistics, setFoodStatistics] = useState<FoodData>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setAllUsersData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (allUsersData) {
      const ages = getAgeStatistic(allUsersData.usersBirthYears)
      setAgeStatistics(ages)
      const food = getFoodStatistics(
        allUsersData.usersFoodPreferences,
        allUsersData.numOfSurveys
      )
      setFoodStatistics(food)
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
            {Object.keys(foodStatistics).map((food) => (
              <div key={food}>
                {food}: {foodStatistics[food]}%
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
