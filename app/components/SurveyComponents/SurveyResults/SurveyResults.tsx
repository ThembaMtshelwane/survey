'use client'

import styles from './surveyresults.module.css'

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

  useEffect(() => {
    if (allUsersData) {
      const ages = getAgeStatistic(allUsersData.usersAges)
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
      setActivityStatistics(activities)
    }
  }, [allUsersData])

  return (
    <div>
      {ageStatistics && foodStatistics && activityStatistics ? (
        <section className={styles.resultsContainer}>
          <section className={styles.heading}>Survey Results</section>
          <section className={styles.data}>
            <PersonalData ageStatistics={ageStatistics} />
            <Food foodStatistics={foodStatistics} />
            <Activity activityStatistics={activityStatistics} />
          </section>
        </section>
      ) : !allUsersData ? (
        <div>Loading...</div>
      ) : (
        <div>No Surveys</div>
      )}
    </div>
  )
}
export default SurveyResults

type personalData = {
  ageStatistics: AgeStats
}

const PersonalData = ({ ageStatistics }: personalData) => {
  return (
    <section className={styles.personalData}>
      <section className={styles.dataPoint}>
        <div className={styles.label}>Total number of survey :</div>
        <div className={styles.value}>{ageStatistics.numOfSurveys}</div>
      </section>
      <section className={styles.dataPoint}>
        <div className={styles.label}>Average :</div>
        <div className={styles.value}> {ageStatistics.average}</div>
      </section>

      <section className={styles.dataPoint}>
        <div className={styles.label}>
          Oldest person who participated in survey :
        </div>
        <div className={styles.value}>{ageStatistics.oldest}</div>
      </section>
      <section className={styles.dataPoint}>
        <div className={styles.label}>
          Youngest person who participated in survey :
        </div>
        <div className={styles.value}>{ageStatistics.youngest}</div>
      </section>
    </section>
  )
}

type a = {
  activityStatistics: StatData[]
}
const Activity = ({ activityStatistics }: a) => {
  return (
    <section className={styles.activityData}>
      <div>
        <div className={styles.dataPoint}>
          <div className={styles.label}> People who like to watch movies :</div>
          <div className={styles.value}>{activityStatistics[0].value}</div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            People who like to listen to radio :
          </div>
          <div className={styles.value}>{activityStatistics[1].value}</div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}> People who like to eat out :</div>
          <div className={styles.value}>{activityStatistics[2].value}</div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}> People who like to watch TV :</div>
          <div className={styles.value}>{activityStatistics[3].value}</div>
        </div>
      </div>
    </section>
  )
}

type f = {
  foodStatistics: StatData[]
}
const Food = ({ foodStatistics }: f) => {
  return (
    <section className={styles.foodData}>
      <div className={styles.dataPoint}>
        <div className={styles.label}>
          Percentage of people who like Pizza :
        </div>
        <div className={styles.value}>{foodStatistics[0].value}%</div>
      </div>
      <div className={styles.dataPoint}>
        <div className={styles.label}>
          Percentage of people who like Pasta :
        </div>
        <div className={styles.value}>{foodStatistics[1].value}%</div>
      </div>
      <div className={styles.dataPoint}>
        <div className={styles.label}>
          Percentage of people who like Pap and Wors :
        </div>
        <div className={styles.value}>{foodStatistics[2].value}%</div>
      </div>
    </section>
  )
}
