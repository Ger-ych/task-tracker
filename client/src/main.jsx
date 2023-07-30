import React from 'react'
import ReactDOM from 'react-dom/client'

import Router from './components/Router'
import AuthProvider from './provides/AuthProvider'

import './assets/styles/general.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
