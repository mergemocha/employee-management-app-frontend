import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage<string | undefined>('token', undefined)
