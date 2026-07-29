'use client'

import { LoaderProvider } from '@/components/loader-context'
import PageLoader from '@/components/page-loader'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      <PageLoader />
      {children}
    </LoaderProvider>
  )
}
