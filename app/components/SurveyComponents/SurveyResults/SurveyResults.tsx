'use client'

import styles from './surveyresults.module.css'

import { getData, getStoredData } from '@/app/actions/actions'
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
      const storedData = getStoredData()
      if (storedData) {
        setAllUsersData(storedData)
      } else {
        const initialData = await getData()
        setAllUsersData(initialData)
      }
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
        <section className={styles.resultsContainer}>
          <section className={styles.heading}>Survey Results</section>
          <section className={styles.data}>
            <section className={styles.personalData}>
              <section className={styles.dataPoint}>
                <div className={styles.label}>Total number of survey:</div>
                <div className={styles.value}>{allUsersData?.numOfSurveys}</div>
              </section>
              <section className={styles.dataPoint}>
                <div className={styles.label}>Average:</div>
                <div className={styles.value}> {ageStatistics.average}</div>
              </section>

              <section className={styles.dataPoint}>
                <div className={styles.label}>
                  Oldest person who participated in survey:
                </div>
                <div className={styles.value}>{ageStatistics.oldest}</div>
              </section>
              <section className={styles.dataPoint}>
                <div className={styles.label}>
                  Youngest person who participated in survey:
                </div>
                <div className={styles.value}>{ageStatistics.youngest}</div>
              </section>
            </section>

            <section className={styles.foodData}>
              {foodStatistics.map((food) => (
                <div key={food.label} className={styles.dataPoint}>
                  <div className={styles.label}>
                    Percentage of people who like {food.label} :
                  </div>
                  <div className={styles.value}>{food.value}%</div>
                </div>
              ))}
            </section>

            <section className={styles.activityData}>
              <div>
                {activityStatistics.map((activity) => (
                  <div key={activity.label} className={styles.dataPoint}>
                    <div> People who like to {activity.label}:</div>
                    <div className={styles.value}>{activity.value}%</div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </section>
      ) : allUsersData ? (
        <div>Loading...</div>
      ) : (
        <div>No Surveys</div>
      )}
    </div>
  )
}
export default SurveyResults
