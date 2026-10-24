import QueryProvider from '@/providers/QueryProviders'
import LeftSidebar from '@/src/components/LeftSidebar'
import RightSidebar from '@/src/components/RightSidebar'
import React from 'react'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <div className="max-w-7xl mx-auto flex">
        <LeftSidebar />

        <main className="flex-1 xl:max-w-150 border-x border-border min-h-screen">
          {children}
        </main>

        <RightSidebar />
      </div>
    </QueryProvider>
  )
}
