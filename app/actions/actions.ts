export const FormSubmitAction = async (
  prevState: string,
  formData: FormData
) => {
  try {
    const res = await fetch('/api', {
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

