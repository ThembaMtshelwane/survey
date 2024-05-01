import { activities } from '../lib/data'
import { ActivityData } from '../lib/definitions'

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
    rating,
  }

  // send userData to database
  const res = { message: 'User data sent' }
  return Response.json(res)
}
