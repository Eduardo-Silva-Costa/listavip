import './style.css'

import { db } from '../../services/firebase';
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'

export function VerLista() {
  const { id } = useParams()
  const [lista, setLista] = useState({})

  const [titulo, setTitulo] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState('')
  const [inscricoes, setInscricoes] = useState(0)

  const docRef = doc(db, "listas", id)
  useEffect(() => {

    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLista({ id: docSnap.id, dados: docSnap.data() })

        setTitulo(lista.dados.titulo)
        setDetalhes(lista.dados.detalhes)
        setData(lista.dados.data)
        setInscricoes(lista.dados.inscricoes.length)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getLista()
  }, [])

  async function atualizar() {
    var res = confirm('Tem certeza quer atualizar as informações da lista?')
    if (res == true) {
      await updateDoc(docRef, {
        titulo: titulo,
        detalhes: detalhes,
        data: data,
      })

      alert('Lista atualizada!')
    }
  }

  function volta() {

    window.history.back();
  }

  return (
    <main>
      <section>
        <h2>ver lista</h2>
        <form>
          <label htmlFor="data">Titulo:</label>
          <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <label htmlFor="detalhes">Detalhes da Lista:</label>
          <textarea name="detalhes" id="detalhes" cols="30" rows="5" value={detalhes} onChange={(e) => setDetalhes(e.target.value)}></textarea>
          <label htmlFor="hora">Data:</label>
          <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
          <p>Inscrições: {inscricoes}</p>
          <Link to={`/inscricoes/${lista.id}`} className='btn'>Ver Inscritos</Link>
          <button type='button' className='btn__upload' onClick={atualizar}>Atualizar Lista</button>
          <button type='button' className='danger' >Excluir Lista</button>
        </form>
        <button type='button' className='btn' onClick={volta}><i className="bi bi-arrow-left-circle"></i> Voltar</button>
      </section>
    </main>
  )
}