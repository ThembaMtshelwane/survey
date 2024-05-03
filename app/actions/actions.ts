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
      storeDataLocally(data)
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const storeDataLocally = (data: any) => {
  localStorage.setItem('formData', JSON.stringify(data))
}
export const getData = async () => {
  try {
    const storedData = localStorage.getItem('formData')
    if (storedData) {
      return JSON.parse(storedData)
    } else {
      const res = await fetch('/api/getData', { method: 'GET' })
      if (res.ok) {
        const data = await res.json()
        storeDataLocally(data)
        return data
      }
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
