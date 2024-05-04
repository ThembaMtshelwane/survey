import { AllUsersInfo } from '../lib/definitions'
import { isEmailInList, storeGetDataLocally, storePostDataLocally } from '../utils/utils'

export const FormSubmitAction = async (
  prevState: string,
  formData: FormData
) => {
  try {
    const res = await fetch('/api/sendData', {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      storePostDataLocally(formData.get('email'))
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getData = async () => {
  try {
    const storedData = localStorage.getItem('formData')
    if (isEmailInList() && storedData) {
      return JSON.parse(storedData)
    } else {
      const res = await fetch('/api/getData', { method: 'GET' })
      if (res.ok) {
        const data: AllUsersInfo = await res.json()
        storeGetDataLocally(data)
        return data
      }
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
