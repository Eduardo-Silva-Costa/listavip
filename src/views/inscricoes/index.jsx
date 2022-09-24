import './style.css'

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"

export function Inscricoes() {
  const { id } = useParams()
  const [listaID, setListaID] = useState('')
  const [inscricoes, setInscricoes] = useState([])

  useEffect(() => {
    const docRef = doc(db, "listas", id)
    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setInscricoes(docSnap.data().inscricoes)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getLista()
  }, [])

  const inscritos = inscricoes.map(
    (i) => <li>{i}</li>
  )

  function volta() {

    window.history.back();
  }

  return (
    <main>
      <h2>Inscritos</h2>
      <section className='inscricoes'>
        <ol>
          <>
            {inscritos}
          </>
        </ol>
        <button type='button' className='btn' onClick={volta}><i className="bi bi-arrow-left-circle"></i> Voltar</button>
      </section>
    </main>
  )
}