'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type LoaderContextValue = {
  /** True once the first-load splash has finished */
  isReady: boolean
  markReady: () => void
}

const LoaderContext = createContext<LoaderContextValue>({
  isReady: true,
  markReady: () => {},
})

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const markReady = useCallback(() => setIsReady(true), [])
  const value = useMemo(() => ({ isReady, markReady }), [isReady, markReady])

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoaderReady() {
  return useContext(LoaderContext)
}
