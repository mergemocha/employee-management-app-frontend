import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import tokenAtom from '../atoms/token'
import routes from '../router/routes'

interface Props {
  isMain: boolean
  isAdmin: boolean
}

export default function Navbar (props: Props): JSX.Element {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useAtom(tokenAtom)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              employee-management-app
            </Typography>
            {props.isAdmin &&
              <Button color='inherit' onClick={() => navigate(routes[props.isMain ? 'admin' : 'root'].path)}>
                {props.isMain ? 'Admin' : 'Back to home'}
              </Button>}
            <Button color='inherit' onClick={() => { setToken(undefined); navigate(routes.login.path) }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
