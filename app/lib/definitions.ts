export type Activity = {
  activity: string
  id: string
}

export type ActivityData = {
  nameOfActivity: string
  count: FormDataEntryValue | null | number
}

export type StatData = {
  label: string
  value: number
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
  numOfSurveys: number
}

export type AllUsersInfo = {
  emails: string[]
  usersAges: number[]
  numOfSurveys: number
  usersFoodPreferences: string[]
  usersActivityRatings: ActivityData[]
}
