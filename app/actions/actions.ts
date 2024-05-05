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
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getData = async () => {
  try {
    const res = await fetch('/api/getData', {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      console.log('new data...')
      return data
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
