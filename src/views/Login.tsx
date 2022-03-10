import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useAtom } from 'jotai'
import PasswordField from '../components/PasswordField'
import UsernameField from '../components/UsernameField'
import tokenAtom from '../atoms/token'
import routes from '../router/routes'
import '../assets/scss/Login.scss'

export default function Login (): JSX.Element {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useAtom(tokenAtom)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const { handleSubmit, control } = useForm()

  const onLoginSubmit = async (data: any): Promise<void> => {
    await loginOrRegister({ register: false }, data.username, data.password)
  }

  const onRegisterSubmit = async (data: any): Promise<void> => {
    await loginOrRegister({ register: true }, data.username, data.password)
  }

  const loginOrRegister = async (opts: { register: boolean }, username: string, password: string): Promise<void> => {
    try {
      const res = await axios.post(opts.register ? '/register/add-user' : '/auth/login', { username, password })
      setToken(res.data.token)
      navigate(routes.root.path)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response !== undefined) {
          setErrorMessage(err.response.data?.message)
          setShowErrorMessage(true)
        } else {
          console.error('Error response undefined:', err)
          setShowErrorMessage(true)
          setErrorMessage(`Unknown error: ${err.message}`)
        }
      } else {
        console.error('Non-axios error:', err)
      }
    }
  }

  const handleHideMessages = (): void => {
    setShowErrorMessage(false)
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Title</h1>
        <form>
          <div className='login-textfield-container'>
            <div className='login-textfield'>
              <UsernameField formControl={control} handleHideMessages={handleHideMessages}/>
            </div>
            <div className='login-textfield'>
              <PasswordField formControl={control} handleHideMessages={handleHideMessages}/>
            </div>
          </div>
          <div className='login-button-container'>
            <div className='register-button'>
              <Button color='secondary' variant='contained' onClick={handleSubmit(onRegisterSubmit)}>Register</Button>
            </div>
            <div className='login-button'>
              <Button variant='contained' onClick={handleSubmit(onLoginSubmit)}>Login</Button>
            </div>
          </div>
        </form>
        {showErrorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  )
}
