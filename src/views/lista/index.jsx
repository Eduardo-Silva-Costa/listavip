import './style.css'

import { db } from '../../services/firebase'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Lista() {
  const { id } = useParams()
  const [lista, setLista] = useState({})

  const [nome, setNome] = useState('')
  const [inscricoes, setInscricoes] = useState([])

  const docRef = doc(db, "listas", id)

  useEffect(() => {
    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLista(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getLista()
  }, [])

  async function inscrever() {
    setInscricoes(arr => [...arr, nome])

    await updateDoc(docRef, {
      inscricoes: inscricoes
    })

    alert("Agora seu nome está na lista")
  }

  return (
    <main>
      <section className='lista'>
        <p><span>Titulo:</span> {lista.titulo}</p>
        <p><span>Detalhes:</span></p>
        <p>{lista.detalhes}</p>
        <p><span>Data:</span> {lista.data}</p>
        <form>
          <label htmlFor="nome">Colocar nome na lista?</label>
          <input type="text" name="nome" id="nome" onChange={e => setNome(e.target.value)} placeholder='Escreva seu nome completo aqui' />
          <button type='button' className='btn' onClick={inscrever}>Colocar nome na lista agora</button>
        </form>
        <Link to="/listas"><i className="bi bi-arrow-left-circle"> Voltar</i></Link>
      </section>
    </main>
  )
}