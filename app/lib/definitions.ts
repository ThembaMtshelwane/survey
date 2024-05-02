export type Activity = {
  activity: string
  id: string
}

export type ActivityData = {
  nameOfActivity: string
  count: FormDataEntryValue | null | number
}

export type SurveyInfo = {
  fullNames: string
  email: string
  birthDate: string
  contactNumber: string
  selectedFoods: string[]
  // activityTracker: ActivityData[]
}
