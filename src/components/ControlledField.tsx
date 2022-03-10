import React from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { ReactHookFormRules } from '../types/react-hook-form'

interface Props {
  name: string
  defaultValue?: string
  control: Control<FieldValues, any>
  rules?: ReactHookFormRules
  requiredMessage?: string
  handleHideMessages: () => void
}

export default function ControlledField (props: Props): JSX.Element {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules ?? { required: props.requiredMessage ?? 'Required field' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          sx={{ margin: 1 }}
          onFocus={props.handleHideMessages}
          onChange={onChange}
          defaultValue={props.defaultValue}
          value={value}
          label={props.name}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  )
}
