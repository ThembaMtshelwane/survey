export type Activity = {
  activity: string
  id: string
}

export type ActivityData = {
  nameOfActivity: string
  count: FormDataEntryValue | null | number
}

export type FoodData = {
  foodItem: string
  percentage: number
}

export type SurveyInfo = {
  fullNames: string
  email: string
  birthDate: string
  contactNumber: string
  selectedFoods: string[]
  // activityTracker: ActivityData[]
}

export type AgeStats = {
  oldest: number
  youngest: number
  average: number
}

export type AllUsersInfo = {
  usersBirthYears: string[]
  numOfSurveys: number
  usersFoodPreferences: string[]
  usersActivityRatings: ActivityData[]
}
