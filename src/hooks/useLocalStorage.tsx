// vendors
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, defaultValue?: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(defaultValue as unknown as T)

  useEffect(() => {
    try {
      const localStorageData = localStorage.getItem(key)

      if (localStorageData !== null) {
        const data = JSON.parse(localStorageData)

        setValue(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [key])

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage
