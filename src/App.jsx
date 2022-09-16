import './style/global.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Eventos } from './views/eventos'
import { Evento } from './views/evento'
import { Listas } from './views/listas'
import { Lista } from './views/lista'
import { Sobre } from './views/sobre'
import { Contato } from './views/contato'
import { Login } from './views/login'
import { Dashboard } from './views/dashboard'
import { Footer } from './components/footer'


function App() {
  return (
    <div className="box">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Eventos />} />
          <Route path='/eventos/evento' element={<Evento />} />
          <Route path='/listas' element={<Listas />} />
          <Route path='/listas/lista' element={<Lista />} />
          <Route path='/sobre' element={<Sobre />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
