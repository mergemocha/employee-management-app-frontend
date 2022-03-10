import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import { useAtom } from 'jotai'
import Navbar from '../components/Navbar'
import UserContextActions from '../components/UserContextActions'
import { Employee } from '../types/api'
import tokenAtom from '../atoms/token'
import ctxAtom, { UserEditorCtx } from '../atoms/user-editor-ctx'
import EmployeeEditor from '../components/EmployeeEditor'
import '../assets/scss/Table.scss'

export default function Main (): JSX.Element {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [token] = useAtom(tokenAtom)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ctx, setCtx] = useAtom(ctxAtom)

  useEffect(() => {
    console.log('run')
    void getEmployees()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEmployees])

  const getEmployees = async (): Promise<void> => {
    try {
      const res = await axios.get('/employees/', {
        headers: {
          Authorization: token as string
        }
      })
      setEmployees(res.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response !== undefined) {
          console.error(`Axios error: ${err.response.data}`)
        } else {
          console.error('Error response undefined:', err)
        }
      } else {
        console.error(`Non-axios error: ${err}`)
      }
    }
  }

  const openEditor = (action: UserEditorCtx['action'], employee?: Employee): void => {
    setCtx({ action, open: true, employee })
  }

  useEffect(() => {
    void getEmployees()
  })

  const deleteEmployee = async (id: string): Promise<void> => {
    try {
      await axios.delete(`/employees/${id}`, {
        headers: {
          Authorization: token as string
        }
      })
      await getEmployees()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response !== undefined) {
          console.error(`Axios error: ${err.response.data.message}`)
        } else {
          console.error('Error response undefined:', err)
        }
      } else {
        console.error(`Non-axios error: ${err}`)
      }
    }
  }
  return (
    <div>
      <Navbar/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell align='right'>Last name</TableCell>
              <TableCell align='right'>Title</TableCell>
              <TableCell align='right'>Department</TableCell>
              <TableCell align='right'>Salary</TableCell>
              <TableCell align='right'>Security clearancelevel</TableCell>
              <TableCell align='right'>Permanent</TableCell>
              <TableCell align='right'>Projects</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {employee.firstName}
                </TableCell>
                <TableCell align='right'>{employee.lastName}</TableCell>
                <TableCell align='right'>{employee.title}</TableCell>
                <TableCell align='right'>{employee.department}</TableCell>
                <TableCell align='right'>{employee.salary}</TableCell>
                <TableCell align='right'>{employee.secLevel}</TableCell>
                <TableCell align='right'>{employee.permanent}</TableCell>
                <TableCell align='right'>{employee.projects}</TableCell>
                <TableCell align='right'>
                  <UserContextActions
                    employee={employee}
                    openEditor={openEditor}
                    deleteEmployee={deleteEmployee}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        className='add-row-floating-action-button'
        aria-label='add'
        color='primary'
        onClick={() => openEditor('create')}
      >
        <AddIcon/>
      </Fab>
      <EmployeeEditor/>
    </div>
  )
}
