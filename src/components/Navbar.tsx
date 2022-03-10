import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import React from 'react'

export default function Navbar (): JSX.Element {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              GoblinCamp
            </Typography>
            <Button color='inherit'>Admin</Button>
            <Button color='inherit'>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
