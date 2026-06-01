import AppRoutes from '@/routes'

// The app shell. For now it just renders the routes; later it will wrap them
// with app-wide layout (NavBar, footer) and context providers (auth, etc.).
function App() {
  return <AppRoutes />
}

export default App
