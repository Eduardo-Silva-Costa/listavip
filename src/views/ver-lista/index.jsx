import './style.css'

import { db } from '../../services/firebase';
import { Link, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'

export function VerLista() {
  const { id } = useParams()
  const [lista, setLista] = useState({})

  const [titulo, setTitulo] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState('')

  const docRef = doc(db, "listas", id)
  useEffect(() => {

    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLista({ id: docSnap.id, dados: docSnap.data() })

        setTitulo(docSnap.data().titulo)
        setDetalhes(docSnap.data().detalhes)
        setData(docSnap.data().data)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getLista()
  }, [])

  async function atualizar() {
    var res = confirm('Atualizar as informações da lista?')
    if (res == true) {
      await updateDoc(docRef, {
        titulo: titulo,
        detalhes: detalhes,
        data: data,
      })

      alert('Lista atualizada!')
    }
  }

  async function deletar() {
    var res = confirm('Quer mesmo excluir a lista?')

    if (res == true) {
      await deleteDoc(docRef)

      alert('Lista excluida!')
    }
  }

  function volta() {
    window.history.back();
  }

  return (
    <main>
      <section>
        <h2>Atualizar ou excluir lista</h2>
        <form>
          <label htmlFor="data">Titulo:</label>
          <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <label htmlFor="detalhes">Detalhes da Lista:</label>
          <textarea name="detalhes" id="detalhes" cols="30" rows="5" value={detalhes} onChange={(e) => setDetalhes(e.target.value)}></textarea>
          <label htmlFor="hora">Data:</label>
          <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
          <Link to={`/inscricoes/${lista.id}`} className='btn'>Ver Inscritos</Link>
          <button type='button' className='btn__upload' onClick={atualizar}>Atualizar Lista</button>
          <button type='button' className='danger' onClick={deletar}>Excluir Lista</button>
        </form>
        <i className="bi bi-arrow-left-circle" onClick={volta}> Voltar</i>
      </section>
    </main>
  )
}