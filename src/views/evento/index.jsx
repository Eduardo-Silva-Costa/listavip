import './style.css'

import { Link } from 'react-router-dom'

import { EventoContext } from '../../contexts/eventoContext'
import { useContext } from 'react'

export function Evento() {
  const { evento } = useContext(EventoContext)
  return (
    <main>
      <section className='evento'>
        <img src={evento.foto} alt="Flyer do Evento" />
        <div>
          <p><span>Tipo:</span> {evento.tipo}</p>
          <p><span>Titulo:</span> {evento.titulo}</p>
          <p><span>Gênero:</span> {evento.genero}</p>
          <p><span>Data:</span> {evento.data}</p>
          <p><span>Hora:</span> {evento.hora}</p>
          <p><span>Detalhes:</span></p>
          <p>{evento.detalhes}</p>
          <Link className='bnt' to="/"><i class="bi bi-arrow-left-circle"> Voltar</i></Link>
        </div>
      </section>
    </main>
  )
}