import { db } from '@/app/firebase/firebaseConfig'
import { ActivityData } from '@/app/lib/definitions'
import { getDocs, collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  let usersBirthYears: string[] = []
  let usersFoodPreferences: string[] = []
  let usersActivityRatings: ActivityData[] = []

  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      usersBirthYears.push(doc.data().birthDate)
    })

    const querySnapshot2 = await getDocs(collection(db, 'allFoodPreferences'))
    querySnapshot2.forEach((doc) => {
      usersFoodPreferences.push(...doc.data().selectedFoods)
    })

    const querySnapshot3 = await getDocs(collection(db, 'allActivityRatings'))
    querySnapshot3.forEach((doc) => {
      usersActivityRatings.push(...doc.data().activityRatings)
    })

    console.log('All users fetched successfully')
    return NextResponse.json({
      usersBirthYears: usersBirthYears,
      numOfSurveys: usersBirthYears.length,
      usersFoodPreferences: usersFoodPreferences,
      usersActivityRatings: usersActivityRatings,
    })
  } catch (error) {
    console.error('Error fetching users: ', error)
    throw error
  }
}
