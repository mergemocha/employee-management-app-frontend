import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Snackbar from '@mui/material/Snackbar'
import { useAtom } from 'jotai'
import '../assets/scss/UserCard.scss'
import tokenAtom from '../atoms/token'
import { User } from '../types/api'

interface Props {
  user: User
  available: string[]
}

export default function UserCard (props: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string | undefined>()
  const [token] = useAtom(tokenAtom)

  useEffect(() => {
    if (message) {
      setOpen(true)
    }
  }, [message])

  const snackbarTimeout = 5000

  // Generate permissions
  const defaultPerms: { [key: string]: boolean } = {}
  for (const permission of props.available) {
    defaultPerms[permission] = false
  }

  const userPerms = Object.assign({}, defaultPerms)
  for (const permission of props.user.permissions) {
    userPerms[permission] = true
  }

  const [permissions, setPermissions] = useState(userPerms)

  // Event handlers

  function getChanges (): string[] {
    const newPerms = []

    for (const permission in permissions) {
      if (permissions[permission]) {
        newPerms.push(permission)
      }
    }

    return newPerms
  }

  const handleCheck = (permission: string, checked: boolean): void => {
    const newPerms = Object.assign({}, permissions)
    newPerms[permission] = checked
    setPermissions(newPerms)
  }

  const handleSave = async (): Promise<void> => {
    try {
      await axios.patch(`/permissions/${props.user.id}`, { permissions: getChanges() }, {
        headers: { Authorization: token as string }
      })

      setMessage('Saved successfully.')
    } catch (err) {
      console.error(`Could not save permissions for user ${props.user.username} (${props.user.id})`, err)
      setMessage('Saving failed.')
    }
  }

  const handleReset = async (): Promise<void> => {
    setPermissions(defaultPerms)

    try {
      await axios.patch(`/permissions/${props.user.id}`, { permissions: [] }, {
        headers: { Authorization: token as string }
      })

      setMessage(`Permissions for user ${props.user.username} reset.`)
    } catch (err) {
      console.error(`Could not reset permissions for user ${props.user.username} (${props.user.id})`, err)
      setMessage('Reset failed.')
    }
  }

  return (
    <>
      <Card sx={{ margin: 1 }}>
        <CardContent classes={{ root: 'user-card' }}>
          <Typography variant='h2' sx={{ fontSize: 22, textAlign: 'center', marginBottom: 1 }}>
            User: {props.user.username}
          </Typography>
          <FormGroup>
            {props.available.map((permission, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={permissions[permission]}
                    onChange={event => handleCheck(permission, event.target.checked)}
                  />
                }
                label={permission}
              />
            ))}
          </FormGroup>
        </CardContent>
        <CardActions classes={{ root: 'actions' }}>
          <Button variant='contained' color='error' onClick={handleReset}>Reset</Button>
          <Button variant='contained' onClick={handleSave}>Save</Button>
        </CardActions>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={snackbarTimeout}
        message={message}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
