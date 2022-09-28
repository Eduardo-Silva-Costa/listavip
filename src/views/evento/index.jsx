import './style.css'

import { db } from '../../services/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Evento() {
  const { id } = useParams()
  const [evento, setEvento] = useState({})

  useEffect(() => {
    const docRef = doc(db, "eventos", id)
    async function getEvento() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setEvento(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      let cont = docSnap.data().visualizacoes

      await updateDoc(docRef, {
        visualizacoes: cont + 1
      })
    }

    getEvento()
  }, [])

  function volta() {
    window.history.back();
  }

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
          <div className="share">
            <a href="https://www.facebook.com/sharer/sharer.php?u=http://listavip.netlify.app" target="_blank" rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
            <a href="https://api.whatsapp.com/send?text=http://listavip.netlify.app" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i></a>
          </div>
          <i className="bi bi-arrow-left-circle" onClick={volta}>Voltar</i>
        </div>
      </section>
    </main>
  )
}