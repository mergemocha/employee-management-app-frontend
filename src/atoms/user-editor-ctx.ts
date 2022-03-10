import { atom } from 'jotai'
import { Employee } from '../types/api'

export interface UserEditorCtx {
  action: 'create' | 'edit'
  open: boolean
  employee?: Employee
}

export default atom<UserEditorCtx>({ action: 'create', open: false, employee: undefined })
