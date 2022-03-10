export interface User {
  id: string
  username: string
  permissions: string[]
}

export interface Employee {
  id: string
  firstName: string
  lastName: string
  title: string
  department: string
  salary: number
  secLevel: number
  permanent: boolean
  projects: string[]
}
