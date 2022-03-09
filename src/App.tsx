import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './assets/scss/App.scss'
import routes from './router/routes'
import Loading from './views/Loading'

function App (): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    const authlessPaths = Object.values(routes)
      .filter(route => route.ignoreAuth)
      .map(route => route.path)

    // FIXME: Check global state instead
    if (!authlessPaths.includes(window.location.pathname) && !localStorage.getItem('token')) {
      navigate(routes.login.path)
    }
  }, [navigate])

  function declareRoutes (): JSX.Element[] {
    const routeElements: JSX.Element[] = []

    for (const route in routes) {
      const currentRoute = routes[route]
      routeElements.push(
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          element={
            <React.Suspense fallback={<Loading/>}>
              <currentRoute.component/>
            </React.Suspense>
          }
        />
      )
    }

    return routeElements
  }

  return (
    <Routes>
      {declareRoutes()}
    </Routes>
  )
}

export default App
