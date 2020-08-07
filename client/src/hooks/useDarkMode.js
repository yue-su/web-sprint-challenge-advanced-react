import { useState } from "react"

export const useDarkMode = (initialValue) => {
  const [state, setState] = useState(initialValue)

   const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return [state, handleChange]
}
