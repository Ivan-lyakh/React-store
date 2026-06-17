import { useState } from "react"
import { type Dispatch, type SetStateAction } from "react"

export type ActionFilter = {
  setFastFilter: Dispatch<SetStateAction<string>>
}

export const useFilter = () => {

  const [fastFilter, setFastFilter] = useState("popular")

  console.log(`Hooks filter: ${fastFilter}`)

  

  const actionFilter = { setFastFilter }

  return { fastFilter, actionFilter }
}