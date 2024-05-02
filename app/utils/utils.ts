import { ActivityData, FoodData } from '../lib/definitions'

export const dateToAge = (formDateInput: string) => {
  return new Date().getFullYear() - new Date(formDateInput).getFullYear()
}

const elementCount = (elementName: string, array: string[]) => {
  const dataContainer: string[] = []
  array.forEach((item) => {
    if (item === elementName) {
      dataContainer.push(item)
    }
  })
  return dataContainer.length
}

// replace userBirthDates: string[] with userAges: number[]
export const getAgeStatistic = (userBirthDates: string[]) => {
  if (userBirthDates.length === 0) return { oldest: 0, youngest: 0, average: 2 }

  const currentYear = new Date().getFullYear()
  const userAges = userBirthDates.map(
    (userBirthDate: string) =>
      currentYear - new Date(userBirthDate).getFullYear()
  )

  userAges.sort((a, b) => a - b)
  const oldest = userAges[userAges.length - 1]
  const youngest = userAges[0]
  const sum = userAges.reduce((acc, age) => acc + age, 0)
  const average = userAges.length > 0 ? sum / userAges.length : 0

  return { oldest, youngest, average }
}

export const getFoodStatistics = (usersFoodPreferences: string[]) => {
  const foodOptions = ['pizza', 'pasta', 'papAndWors', 'other']

  const foodStatistics: FoodData[] = foodOptions.map((foodItem) => {
    const count = elementCount(foodItem, usersFoodPreferences)
    const percentage = parseFloat(
      ((count / usersFoodPreferences.length) * 100).toFixed(1)
    )
    return { foodItem, percentage }
  })
  return foodStatistics
}

export const getActivityStatistics = (
  usersActivityRatings: ActivityData[],
  numOfSurveys: number
) => {}
