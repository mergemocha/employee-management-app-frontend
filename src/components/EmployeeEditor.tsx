import React, { useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import tokenAtom from '../atoms/token'
import ctxAtom from '../atoms/user-editor-ctx'
import ControlledField from './ControlledField'
import { ReactHookFormRules } from '../types/react-hook-form'
import { inputsReverse } from '../utils/inputs'

export default function UserEditor (): JSX.Element {
  const [token] = useAtom(tokenAtom)
  const [ctx, setCtx] = useAtom(ctxAtom)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const { handleSubmit, control } = useForm()

  const handleClose = (): void => {
    setCtx({ action: ctx.action, open: false, employee: undefined })
  }

  const mapValuesReverse = (data: { [key: string]: any }): { [key: string]: any } => {
    const values: { [key: string]: any } = {}

    for (const key in data) {
      const name = inputsReverse[key]
      values[name] = data[key]
    }

    return values
  }

  const handleSave = async (data: any): Promise<void> => {
    await axios.post('/employees', { ...mapValuesReverse(data), permanent: true, projects: [] }, {
      headers: { Authorization: token as string }
    })
  }

  const createInput = (name: string, defaultValue?: string, rules?: ReactHookFormRules): JSX.Element => (
    <Grid item>
      <ControlledField
        name={name}
        defaultValue={defaultValue}
        control={control}
        handleHideMessages={() => setShowErrorMessage(false)}
        rules={rules}
      />
    </Grid>
  )

  return (
    <Dialog
      open={ctx.open}
      onClose={handleClose}
    >
      <DialogTitle>
        {ctx.action === 'create' ? 'Create new employee' : `Editing employee "${ctx.employee?.firstName} ${ctx.employee?.lastName}"`}
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ margin: 2 }}>
          {createInput('First name', ctx.employee?.firstName)}
          {createInput('Last name', ctx.employee?.lastName)}
          {createInput('Title', ctx.employee?.title)}
          {createInput('Department', ctx.employee?.department)}
          {createInput('Salary', ctx.employee?.salary ? ctx.employee.salary.toString() : undefined, { required: 'Field must be a number', pattern: /^[0-9]+$/ })}
          {createInput('Security clearance level', ctx.employee?.secLevel ? ctx.employee.secLevel.toString() : undefined, { required: 'Field must be a number', pattern: /^[0-9]+$/ })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleSave)} autoFocus>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
