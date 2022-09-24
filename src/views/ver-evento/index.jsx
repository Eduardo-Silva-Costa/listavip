import './style.css'

import { db } from '../../services/firebase';
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'

export function VerEvento() {
  const { id } = useParams()
  const [evento, setEvento] = useState({})

  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('')
  const [genero, setGenero] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [censura, setCensura] = useState('')

  const docRef = doc(db, "eventos", id)
  useEffect(() => {

    async function getEvento() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setEvento(docSnap.data())

        setTitulo(evento.titulo)
        setTipo(evento.tipo)
        setGenero(evento.genero)
        setDetalhes(evento.detalhes)
        setData(evento.data)
        setHora(evento.hora)
        setCensura(evento.censura)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getEvento()
  }, [])

  async function atualizar() {
    var res = confirm('Tem certeza quer atualizar as informações do evento?')

    if (res == true) {
      await updateDoc(docRef, {
        titulo: titulo,
        tipo: tipo,
        genero: genero,
        detalhes: detalhes,
        data: data,
        hora: hora,
        censura: censura
      })

      alert('Evento atualizado!')
    }
  }

  return (
    <main>
      <section className='upload'>
        <h2>Atualizarou excluir evento</h2>
        <form>
          <label htmlFor="titulo">Título:</label>
          <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <label htmlFor="tipo">Tipo do evento:</label>
          <select name="tipo" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option selected >-- escolher --</option>
            <option>Festa</option>
            <option>Festival</option>
            <option>Show</option>
          </select>
          <label htmlFor="genero">Gênero musical:</label>
          <select name="genero" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option selected value>-- escolher --</option>
            <option>Anos 80</option>
            <option>Baile da Sudade</option>
            <option>Brega</option>
            <option>Carimbó</option>
            <option>Eletrônica</option>
            <option>Forró</option>
            <option>Funk</option>
            <option>Mid Back</option>
            <option>MPB</option>
            <option>Outro</option>
            <option>Pop</option>
            <option>Rap</option>
            <option>Reggae</option>
            <option>Rock</option>
            <option>Samba</option>
            <option>Sertanejo</option>
          </select>
          <label htmlFor="detalhes">Detalhes do Evento:</label>
          <textarea name="detalhes" id="detalhes" cols="30" rows="10" value={detalhes} onChange={(e) => setDetalhes(e.target.value)}></textarea>
          <label htmlFor="data">Data:</label>
          <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
          <label htmlFor="hora">Hora:</label>
          <input type="time" name="hora" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
          <label htmlFor="censura">Censura:</label>
          <select name="censura" id="censura" value={censura} onChange={(e) => setCensura(e.target.value)}>
            <option selected >-- escolher --</option>
            <option>18 anos</option>
            <option>16 anos</option>
            <option>14 anos</option>
            <option>Livre</option>
          </select>
          <button type='button' className='btn__upload' onClick={atualizar}>Atualizar Evento</button>
          <button type='button' className='danger' >Excluir Evento</button>
        </form>
        <Link to="/dashboard"><i className="bi bi-arrow-left-circle"> Voltar</i></Link>
      </section>
    </main>
  )
}