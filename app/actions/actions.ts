export const FormSubmitAction = async (
  prevState: string,
  formData: FormData
) => {
  try {
    const res = await fetch('http://localhost:3000/api/sendData/', {
      mode: 'no-cors',
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      const storedData = getStoredData()
      if (storedData) {
        localStorage.removeItem('formData')
      }
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/getData/', {
      mode: 'no-cors',
      method: 'GET',
    })
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('formData', JSON.stringify(data))
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
export const getStoredData = () => {
  const storedData = localStorage.getItem('formData')
  return storedData ? JSON.parse(storedData) : null
}
