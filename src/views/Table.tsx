import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Employee } from '../components/Employee'
import TablePopover from '../components/TablePopover'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import '../assets/scss/Table.scss'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useAtom } from 'jotai'
import tokenAtom from '../atoms/token'

export default function TabletoExport (): JSX.Element {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [token] = useAtom(tokenAtom)

  useEffect(() => {
    void getEmployees()
  }, [])

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
          console.error(`Error response undefined: ${err.response}`)
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
                <TableCell align='right'><TablePopover employee={employee}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab className='add-row-floating-action-button' aria-label='add' color='primary'><AddIcon/></Fab>
    </div>
  )
}
