import { useMemo } from "react"

interface UseDisabledOptions {
  conditions: boolean[]
}

export function useDisabled({ conditions }: UseDisabledOptions) {
  return useMemo(() => conditions.some(Boolean), [conditions])
}
