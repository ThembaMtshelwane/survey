export const FormSubmitAction = async (
  prevState: string,
  formData: FormData
) => {
  const res = await fetch('http://localhost:3000/api', {
    method: 'POST',
    body: formData,
  })
  console.log('res', res)

  const data = await res.json()
  console.log(data)

  return data
}
