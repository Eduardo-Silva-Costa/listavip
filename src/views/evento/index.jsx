import './style.css'

import { Link } from 'react-router-dom'

import { EventoContext } from '../../contexts/eventoContext'
import { useContext } from 'react'

export function Evento() {
  const { evento } = useContext(EventoContext)
  return (
    <main>
      <section className='evento'>
        <Link to="/"><i class="bi bi-arrow-left-circle"> Voltar</i></Link>
        <div className="flyer">
          <img src={evento.foto} alt="Flyer do Evento" />
        </div>
        <div>
          <p>Tipo: {evento.tipo}</p>
          <p>Titulo: {evento.titulo}</p>
          <p>Gênero: {evento.genero}</p>
          <p>Data: {evento.data}</p>
          <p>Hora: {evento.hora}</p>
          <p>Detalhes: {evento.detalhes}</p>
        </div>
      </section>
    </main>
  )
}