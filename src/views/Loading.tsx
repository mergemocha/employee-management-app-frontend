import React from 'react'
import { CircularProgress, Typography } from '@mui/material'
import '../assets/scss/Loading.scss'

export default function Loading (): JSX.Element {
  return (
    <div className='loading'>
      <CircularProgress size={100}/>
      <Typography variant='h1' classes={{ root: 'text' }}>
        Loading...
      </Typography>
    </div>
  )
}
