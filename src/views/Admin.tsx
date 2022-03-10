import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { User } from '../types/api'
import tokenAtom from '../atoms/token'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import '../assets/scss/Admin.scss'

export default function Admin (): JSX.Element {
  const [token] = useAtom(tokenAtom)
  const [available, setAvailable] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios.get('/permissions/available', { headers: { Authorization: token as string } })
      .then(res => { setAvailable(res.data) })
      .catch(console.error)
  }, [token])

  useEffect(() => {
    axios.get('/users', { headers: { Authorization: token as string } })
      .then(res => { setUsers(res.data) })
      .catch(console.error)
  }, [token])

  return (
    <div className='admin'>
      <Navbar isAdmin isMain={false}/>
      <Grid container sx={{ margin: 2 }}>
        {
          users.length === 0
            ? 'There are no users registered in the system yet.'
            : available.length === 0
              ? 'Loading...'
              : users.map(user => <UserCard key={user.id} available={available} user={user}/>)
        }
      </Grid>
    </div>
  )
}
