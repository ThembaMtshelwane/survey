'use client'

import styles from './surveyform.module.css'
import { useEffect, useState } from 'react'
// import { getUsersBirthYears } from '@/app/api/getData/route'

// const getData = async () => {
//   const res = await fetch('http://localhost:3000/api/getData', {
//     method: 'GET',
//   })
//   return res.json()
// }

type Props = {
  // data: () => Promise<any>
}

const SurveyResults = async (props: Props) => {
  const [birthYears, setBirthYears] = useState<string[]>([])
  const getData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getData', {
        method: 'GET',
      })
      if (res) {
        console.log('res', res)
      }
    } catch (error) {}
  }

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await getUsersBirthYears()
    //     setBirthYears(data)
    //   } catch (error) {
    //     console.error('Error fetching user birth years:', error)
    //   }
    // }
    // fetchData()
    //
    //
    // const fetchData = async () => {
    //   try {
    //     const data = await getData()
    //     console.log('gggggg', data)
    //     setBirthYears(data)
    //   } catch (error) {
    //     console.error('Error fetching user birth years:', error)
    //   }
    // }
    // fetchData()
    //
    //
    //
    getData()
  }, [birthYears])

  console.log(birthYears)

  return (
    <div>
      SurveyResults
      <div>{birthYears.length > 0 ? birthYears[0] : 'Loading...'}</div>
    </div>
  )
}
export default SurveyResults
