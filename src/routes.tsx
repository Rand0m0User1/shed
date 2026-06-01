import { Routes, Route } from 'react-router'
import HomePage from '@/pages/general/HomePage'
import ChartPage from '@/pages/general/ChartPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chart/:chartId" element={<ChartPage />} />
    </Routes>
  )
}

export default AppRoutes
