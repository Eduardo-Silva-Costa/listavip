import './style.css'

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"

export function Inscricoes() {
  const { id } = useParams()
  const [lista, setLista] = useState({})
  const [inscricoes, setInscricoes] = useState([])

  useEffect(() => {
    const docRef = doc(db, "listas", id)
    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLista({ id: docSnap.id, dados: docSnap.data() })
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

  return (
    <main>
      <h2>Inscritos</h2>
      <section className='inscricoes'>
        <p>Lista: {lista.dados.titulo}, Data: {lista.dados.data}, Total de inscritos: {lista.dados.inscricoes.length}</p>
        <ol>
          <>
            {inscritos}
          </>
        </ol>
        <Link to={`/ver-lista/${lista.id}`}><i className="bi bi-arrow-left-circle"> Voltar</i></Link>
      </section>
    </main>
  )
}