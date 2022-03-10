import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './assets/scss/App.scss'
import tokenAtom from './atoms/token'
import routes from './router/routes'
import Loading from './views/Loading'

function App (): JSX.Element {
  const navigate = useNavigate()
  const [token] = useAtom(tokenAtom)

  useEffect(() => {
    const authlessPaths = Object.values(routes)
      .filter(route => route.ignoreAuth)
      .map(route => route.path)

    if (!authlessPaths.includes(window.location.pathname) && !token) {
      navigate(routes.login.path)
    }
  }, [navigate, token])

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
