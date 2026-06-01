import { Routes, Route } from 'react-router'
import HomePage from '@/pages/general/HomePage'

// The app's route table. Kept separate from App.tsx (the shell) so adding a
// page is a one-line change here. BrowserRouter is provided in main.tsx.
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes
