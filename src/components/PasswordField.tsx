import React, { useState } from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

interface Props {
  formControl: Control<FieldValues, any>
  handleHideMessages: () => void
}

export default function PasswordField (props: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const endAdornment = (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle password visibility'
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge='end'
      >
        {showPassword ? <VisibilityOff/> : <Visibility/>}
      </IconButton>
    </InputAdornment>
  )

  return (
    <Controller
      name='password'
      control={props.formControl}
      rules={{ required: 'Password required' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          className='password-field'
          onFocus={props.handleHideMessages}
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          sx={{ width: '25ch' }}
          InputProps={{ endAdornment }}
          value={value}
          label='Password'
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  )
}
