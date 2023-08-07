import React from 'react'
import ReactDOM from 'react-dom/client'

import Router from './components/Router'
import AuthProvider from './providers/AuthProvider'

import './assets/styles/general.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
