import React from 'react'
import Aside from '../components/Aside'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
// interface DashboardLayoutProps {
//   children: React.ReactNode
// }

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Aside />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}