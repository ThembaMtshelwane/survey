import { db } from '@/app/firebase/firebaseConfig'
import { ActivityData } from '@/app/lib/definitions'
import { getDocs, collection } from 'firebase/firestore'

export const getData = async () => {
  let usersAges: number[] = []
  let emails: string[] = []
  let usersFoodPreferences: string[] = []
  let usersActivityRatings: ActivityData[] = []
  let numOfSurveys: number = 0

  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      usersAges.push(doc.data().age)
      emails.push(doc.data().email)
    })
    numOfSurveys = usersAges.length

    const querySnapshot2 = await getDocs(collection(db, 'allFoodPreferences'))
    querySnapshot2.forEach((doc: any) => {
      usersFoodPreferences.push(...doc.data().selectedFoods)
    })

    const querySnapshot3 = await getDocs(collection(db, 'allActivityRatings'))
    querySnapshot3.forEach((doc: any) => {
      usersActivityRatings.push(...doc.data().activityRatings)
    })
    const dataFetched = {
      numOfSurveys,
      emails,
      usersAges,
      usersActivityRatings,
      usersFoodPreferences,
    }
    console.log('data fetched')

    return dataFetched
  } catch (error) {}
}
