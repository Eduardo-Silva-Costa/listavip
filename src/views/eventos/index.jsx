import './style.css'

import { Link } from 'react-router-dom'
import { EventoContext } from '../../contexts/eventoContext'
import { useContext, useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'

export function Eventos() {
  const { setEvento } = useContext(EventoContext)
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    const eventosRef = collection(db, "eventos")
    async function getEventos() {
      const hoje = new Date()
      const q = query(eventosRef, orderBy('data', 'asc'));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setEventos(querySnapshot.docs.map((doc) => ({ ...doc.data() })))
      })
    }

    getEventos()
  }, [])

  return (
    <main>
      <h2>Eventos</h2>
      <section className='eventos'>
        {eventos.map((evento) => {
          return (
            <div className="flyer">
              <Link to="/eventos/evento">
                <img src={evento.foto} alt="Flyer do Evento" onClick={() => setEvento({
                  titulo: evento.titulo,
                  tipo: evento.tipo,
                  genero: evento.genero,
                  detalhes: evento.detalhes,
                  data: evento.data,
                  hora: evento.hora,
                  foto: evento.foto,
                })} />
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  )
}