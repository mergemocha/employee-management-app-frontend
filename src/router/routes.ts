import { lazy, LazyExoticComponent } from 'react'

export interface Route {
  path: string
  component: LazyExoticComponent<() => JSX.Element>
  ignoreAuth?: boolean
}

const routes: { [key: string]: Route } = {
  root: {
    path: '/',
    component: lazy(async () => await import('../views/Main')) // FIXME: Temp
  },
  login: {
    path: '/login',
    component: lazy(async () => await import('../views/Login'))
  },
  admin: {
    path: '/admin',
    component: lazy(async () => await import('../views/Admin'))
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
