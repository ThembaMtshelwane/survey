export const dateToAge = (formDateInput: string) => {
  return new Date().getFullYear() - new Date(formDateInput).getFullYear()
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
