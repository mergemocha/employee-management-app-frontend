import React from 'react'
import '../assets/scss/Login.scss'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Login (): JSX.Element {
  const { handleSubmit, control } = useForm()
  // TODO: connect onSubmit to login endpoint
  const onSubmit = (data: any): void => console.log(data)

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Title</h1>
        <form>
          <div className='login-textfield-container'>
            <Controller
              name='username-field'
              control={control}
              rules={{ required: 'Username required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  className='username-field'
                  onChange={onChange}
                  value={value}
                  label='Username'
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </div>
          <div className='login-textfield-container'>
            <Controller
              name='password-field'
              control={control}
              rules={{ required: 'Password required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  className='password-field'
                  onChange={onChange}
                  value={value}
                  label='Password'
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </div>
          <div className='login-button-container'>
            <Button className='login-button' variant='contained' onClick={handleSubmit(onSubmit)}>Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
