import './style.css'

import { db } from '../../services/firebase'
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Lista() {
  const { id } = useParams()
  const [lista, setLista] = useState({})

  const [nome, setNome] = useState('')

  const docRef = doc(db, "listas", id)

  useEffect(() => {
    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLista(docSnap.data())
      } else {
        console.log("No such document!");
      }
    }
    getLista()
  }, [])

  async function inscrever() {
    await updateDoc(docRef, {
      inscricoes: arrayUnion(nome)
    })

    alert("Agora seu nome está na lista")
  }

  function volta() {
    window.history.back();
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
        <div className="share">
          <a href="https://www.facebook.com/sharer/sharer.php?u=http://listavip.netlify.app" target="_blank" rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
          <a href="https://api.whatsapp.com/send?text=http://listavip.netlify.app" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i></a>
        </div>
        <i className="bi bi-arrow-left-circle" onClick={volta}>Voltar</i>
      </section>
    </main>
  )
}