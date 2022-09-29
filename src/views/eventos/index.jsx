import './style.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {

    async function getEventos() {
      console.log('load eventos');
      const eventosRef = collection(db, "eventos");

      const q = query(eventosRef, orderBy('data', 'asc'));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        let evento = { id: doc.id, dados: doc.data() }
        setEventos(arr => [...arr, evento])
      })
    }

    getEventos();
  }, [])

  return (
    <main>
      <h2>Eventos</h2>
      <section className='eventos'>
        {
          eventos.map((evento, index) => {
            return (
              <div className="flyer" key={index}>
                <Link to={`/evento/${evento.id}`}>
                  <img src={evento.dados.foto} alt="Flyer do Evento" />
                </Link>
              </div>
            );
          })
        }
      </section>
    </main>
  )
}