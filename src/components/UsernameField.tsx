import React from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'
import TextField from '@mui/material/TextField'

interface Props {
  formControl: Control<FieldValues, any>
  handleHideMessages: () => void
}

export default function UsernameField (props: Props): JSX.Element {
  return (
    <Controller
      name='username'
      control={props.formControl}
      rules={{ required: 'Username required' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          className='username-field'
          onFocus={props.handleHideMessages}
          sx={{ width: '25ch' }}
          onChange={onChange}
          value={value}
          label='Username'
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  )
}
