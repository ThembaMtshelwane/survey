import { db } from '../firebase/firebaseConfig'
import { activities } from '../lib/data'
import { ActivityData } from '../lib/definitions'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

export const POST = async (req: Request) => {
  const data = await req.formData()
  const activityRatings: ActivityData[] = []

  const rating = activities.map((item) => {
    activityRatings.push({ nameOfActivity: item.id, count: data.get(item.id) })
  })
  const userData = {
    fullNames: data.get('fullNames'),
    email: data.get('email'),
    birthDate: data.get('birthDate'),
    selectedFoods: Array.from(data.getAll('foodItem')),
    activityRatings,
  }

  console.log('user data', userData)

  try {
    const docRef = await addDoc(collection(db, 'users'), userData)

    const foodDocRef = doc(db, 'allFoodPreferences', docRef.id)
    await setDoc(foodDocRef, { selectedFoods: userData.selectedFoods })

    const activityDocRef = doc(db, 'allActivityRatings', docRef.id)
    await setDoc(activityDocRef, { activityRatings: userData.activityRatings })

    return Response.json({ message: 'Data sent successfully' })
  } catch (e) {
    return Response.json({ message: `Error : ${e}` })
  }
}
