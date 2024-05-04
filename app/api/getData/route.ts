import { db } from '@/app/firebase/firebaseConfig'
import { ActivityData } from '@/app/lib/definitions'
import { getDocs, collection } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    let usersAges: number[] = []
    let usersFoodPreferences: string[] = []
    let emails: string[] = []
    let usersActivityRatings: ActivityData[] = []
    let numOfSurveys = 0

    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      usersAges.push(doc.data().age)
      emails.push(doc.data().email)
    })
    numOfSurveys = usersAges.length

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
      emails,
      usersAges: usersAges,
      numOfSurveys,
      usersFoodPreferences: usersFoodPreferences,
      usersActivityRatings: usersActivityRatings,
    })
  } catch (error) {
    console.error('Error fetching users: ', error)
    throw error
  }
}

