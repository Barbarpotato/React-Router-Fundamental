import { useRoutes } from 'react-router-dom'
import { RequiredAuth } from './Components/global'
import { LoginPage, DashboardPage, HomePage, Settings, HomeContent } from './Components/global'
import './App.css'

function App() {

  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <HomeContent />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/dashboard",
          element: <RequiredAuth> <DashboardPage /></RequiredAuth>
        },
        {
          path: "/settings",
          element: <RequiredAuth><Settings /></RequiredAuth>
        }
      ]
    }
  ])

  return routes
}

export default App;