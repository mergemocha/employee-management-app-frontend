import React from 'react'
import { Button, Popover } from '@mui/material'
import { Employee } from './Employee'

interface Props{
  employee: Employee
}

export default function TablePopover (props: Props): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  const handleEdit = (id: string): void => {
    // add code here
    console.log(id)
  }
  const handleRemove = (id: string): void => {
    // add code here
    console.log(id)
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
        <Button onClick={() => handleEdit(props.employee.id)}>Edit</Button>
        <Button onClick={() => handleRemove(props.employee.id)}>Remove</Button>
      </Popover>
    </>
  )
}
