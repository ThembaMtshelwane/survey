import { db } from '@/app/firebase/firebaseConfig'
import { activities } from '@/app/lib/data'
import { ActivityData } from '@/app/lib/definitions'
import { dateToAge } from '@/app/utils/utils'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

export const POST = async (req: Request) => {
  const data = await req.formData()
  const email = data.get('email')?.toString().toLowerCase()
  console.log('email', email)

  try {
    const userQuery = query(
      collection(db, 'users'),
      where('email', '==', email)
    )
    const userSnapshot = await getDocs(userQuery)
    if (!userSnapshot.empty) {
      return Response.json({
        message: 'User already exists',
        status: 'fail',
      })
    }

    const age = dateToAge(data.get('birthDate'))
    if (Number(age) >= 5 && Number(age) <= 120) {
    } else {
      return Response.json({
        message: 'Age must be between 5 and 120',
        status: 'fail',
      })
    }

    if (Array.from(data.getAll('foodItem')).length !== 0) {
    } else {
      return Response.json({
        message: 'Please select one of the food options or Other',
        status: 'fail',
      })
    }

    const activityRatings: ActivityData[] = []
    activities.map((item) => {
      activityRatings.push({
        nameOfActivity: item.id,
        count: data.get(item.id),
      })
    })

    const userData = {
      fullNames: data.get('fullNames'),
      email,
      age,
      selectedFoods: Array.from(data.getAll('foodItem')),
      activityRatings,
    }

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
