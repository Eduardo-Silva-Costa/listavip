import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './contexts/authContext'
import { EventoContextProvider } from './contexts/eventoContext'
import { ListaContextProvider } from './contexts/listaContex'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventoContextProvider>
        <ListaContextProvider>
          <App />
        </ListaContextProvider>
      </EventoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
