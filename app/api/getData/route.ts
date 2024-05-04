import { db } from '@/app/firebase/firebaseConfig'
import { ActivityData } from '@/app/lib/definitions'
import { getDocs, collection } from 'firebase/firestore'
import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import Cors from 'cors'

const cors = Cors({
  methods: ['GET'], // Allow only GET requests
  origin: process.env.NEXT_PUBLIC_CLIENT_URL, // Specify the origin(s) that are allowed to make requests
})

function runMiddleware(req: any, res: NextApiResponse, fn: any) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}
export const GET = async (req: Request, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  await runMiddleware(req, res, cors)
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

    const data = {
      emails,
      usersAges: usersAges,
      numOfSurveys,
      usersFoodPreferences: usersFoodPreferences,
      usersActivityRatings: usersActivityRatings,
    }

    console.log('All users fetched successfully', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching users: ', error)
    throw error
  }
}
