import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './contexts/authContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
