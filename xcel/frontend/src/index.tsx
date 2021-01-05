import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './styles/definitions.scss'
import './styles/main.scss'

import App from './components/App'


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))