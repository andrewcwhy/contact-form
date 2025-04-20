import { useState } from "react"

export function useCounter<T extends { value: string }>() {
  const [count, setCount] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<T>): void => {
    setCount(event.target.value.length)
  }

  const resetCount = (): void => {
    setCount(0)
  }

  return {
    count,
    handleChange,
    resetCount,
  }
}
