import { lazy, LazyExoticComponent } from 'react'

export interface Route {
  path: string
  component: LazyExoticComponent<() => JSX.Element>
  ignoreAuth?: boolean
}

const routes: { [key: string]: Route } = {
  login: {
    path: '/login',
    component: lazy(async () => await import('../views/Login'))
  },
  table: {
    path: '/table',
    component: lazy(async () => await import('../views/Table')),
    ignoreAuth: true
  }
}

if (process.env.NODE_ENV === 'development') {
  routes.loading = {
    path: '/loading',
    component: lazy(async () => await import('../views/Loading')),
    ignoreAuth: true
  }
}

export default routes
