import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { User } from '../types/api'
import tokenAtom from '../atoms/token'
import UserCard from '../components/UserCard'
import routes from '../router/routes'
import '../assets/scss/Admin.scss'

export default function Admin (): JSX.Element {
  const navigate = useNavigate()
  const [token, setToken] = useAtom(tokenAtom)
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              employee-management-app
            </Typography>
            <Button color='inherit' onClick={() => navigate(routes.root.path)}>
              Back to home
            </Button>
            <Button color='inherit' onClick={() => { setToken(undefined); navigate(routes.login.path) }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
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
