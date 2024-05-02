import { db } from '@/app/firebase/firebaseConfig'
import { ActivityData } from '@/app/lib/definitions'
import { getDocs, collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'
import { activities } from '../lib/data'

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


export const POST = async (req: Request) => {
  const data = await req.formData()
  const activityRatings: ActivityData[] = []

  activities.map((item) => {
    activityRatings.push({ nameOfActivity: item.id, count: data.get(item.id) })
  })

  const userData = {
    fullNames: data.get('fullNames'),
    email: data.get('email'),
    birthDate: data.get('birthDate'),
    selectedFoods: Array.from(data.getAll('foodItem')),
    activityRatings,
  }
  try {
    const docRef = await addDoc(collection(db, 'users'), userData)

    const foodDocRef = doc(db, 'allFoodPreferences', docRef.id)
    await setDoc(foodDocRef, { selectedFoods: userData.selectedFoods })

    const activityDocRef = doc(db, 'allActivityRatings', docRef.id)
    await setDoc(activityDocRef, { activityRatings: userData.activityRatings })

    return Response.json({
      message: 'Data sent successfully',
      status: 'success',
    })
  } catch (e) {
    return Response.json({ message: `Error : ${e}`, status: 'fail' })
  }
}
