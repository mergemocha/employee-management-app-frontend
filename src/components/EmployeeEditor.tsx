/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import tokenAtom from '../atoms/token'
import ctxAtom from '../atoms/user-editor-ctx'

export default function UserEditor (): JSX.Element {
  const [token] = useAtom(tokenAtom)
  const [ctx, setCtx] = useAtom(ctxAtom)

  const handleClose = (): void => {
    setCtx({ action: ctx.action, open: false })
  }

  return (
    <Dialog
      open={ctx.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {ctx.action === 'create' ? 'Create new employee' : `Editing employee ${ctx.employee?.firstName} ${ctx.employee?.lastName}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Test
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
