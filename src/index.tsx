/* istanbul ignore file */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './assets/scss/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import config from './config.json'
import axios from 'axios'

axios.defaults.baseURL = `${config.SERVER_URL}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
