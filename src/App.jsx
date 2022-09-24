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
import { VerEvento } from './views/ver-evento'
import { VerLista } from './views/ver-lista'
import { Inscricoes } from './views/inscricoes'
import { Footer } from './components/footer'


function App() {
  return (
    <div className="box">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Eventos />} />
          <Route path='/evento/:id' element={<Evento />} />
          <Route path='/listas' element={<Listas />} />
          <Route path='/lista/:id' element={<Lista />} />
          <Route path='/sobre' element={<Sobre />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/ver-evento/:id' element={<VerEvento />} />
          <Route path='/ver-lista/:id' element={<VerLista />} />
          <Route path='/inscricoes/:id' element={<Inscricoes />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
