export const FormSubmitAction = async (
  prevState: string,
  formData: FormData
) => {
  const res = await fetch('http://localhost:3000/api/sendData', {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  return data
}

export const getData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/getData', {
      method: 'GET',
    })
    if (res) {
      const data = await res.json()
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
