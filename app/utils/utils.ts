import { activityOptions, foodOptions } from '../lib/data'
import { ActivityData, AllUsersInfo, StatData } from '../lib/definitions'
import { differenceInYears, parse } from 'date-fns'

export const dateToAge = (formDateInput: FormDataEntryValue | null) => {
  if (typeof formDateInput === 'string') {
    const birthDate = parse(formDateInput, 'yyyy-MM-dd', new Date())
    const currentDate = new Date()
    return differenceInYears(currentDate, birthDate)
  } else {
    console.error('Birth date is null.')
  }
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

export const getAgeStatistic = (usersAges: number[]) => {
  if (usersAges.length === 0)
    return { oldest: 0, youngest: 0, average: 0, numOfSurveys: 0 }

  usersAges.sort((a, b) => a - b)
  const numOfSurveys = usersAges.length
  const oldest = usersAges[usersAges.length - 1]
  const youngest = usersAges[0]
  const sum = usersAges.reduce((acc, age) => acc + age, 0)
  const average =
    usersAges.length > 0 ? parseFloat((sum / usersAges.length).toFixed(1)) : 0

  return { oldest, youngest, average, numOfSurveys }
}

export const getFoodStatistics = (
  usersFoodPreferences: string[],
  numOfSurveys: number
) => {
  const foodStatistics: StatData[] = foodOptions.map((foodItem) => {
    const count = elementCount(foodItem, usersFoodPreferences)
    const percentage = parseFloat(((count / numOfSurveys) * 100).toFixed(1))
    return { label: foodItem, value: percentage }
  })
  return foodStatistics
}

const sumActivityRatings = (element: string, array: ActivityData[]) => {
  const countContainer: number[] = []
  array.forEach((item) => {
    if (item.nameOfActivity === element) {
      countContainer.push(Number(item.count))
    }
  })
  const sum = countContainer.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  return sum
}

export const getActivityStatistics = (
  usersActivityRatings: ActivityData[],
  numOfSurveys: number
) => {
  const activityStatistics: StatData[] = activityOptions.map((element) => {
    const sum = sumActivityRatings(element, usersActivityRatings)
    const average = parseFloat((sum / numOfSurveys).toFixed(1))
    return { label: element, value: average }
  })
  return activityStatistics
}

export const storePostDataLocally = (email: FormDataEntryValue | null) => {
  localStorage.setItem('email', JSON.stringify(email))
}

export const storeGetDataLocally = (data: AllUsersInfo) => {
  localStorage.setItem('emails', JSON.stringify(data.emails))
  localStorage.setItem('formData', JSON.stringify(data))
}

export const isEmailInList = (): boolean => {
  const storedEmail = localStorage.getItem('email')
  const storedEmailsJSON = localStorage.getItem('emails')

  if (storedEmail && storedEmailsJSON) {
    const email = JSON.parse(storedEmail) as string
    const storedEmails: string[] = JSON.parse(storedEmailsJSON)
    return storedEmails.includes(email)
  }
  return false
}
