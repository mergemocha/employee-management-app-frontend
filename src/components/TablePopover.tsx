import React from 'react'
import { Button, Popover } from '@mui/material'
import { Employee } from '../types/api'
import { UserEditorCtx } from '../atoms/user-editor-ctx'

interface Props {
  employee: Employee
  deleteEmployee: (id: string) => Promise<void>
  openEditor: (action: UserEditorCtx['action'], employee?: Employee) => void
}

export default function TablePopover (props: Props): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Button
        onClick={handleClick}
      >
        Actions
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Button onClick={() => props.openEditor('edit', props.employee)}>Edit</Button>
        <Button onClick={async () => await props.deleteEmployee(props.employee.id)}>Remove</Button>
      </Popover>
    </>
  )
}
