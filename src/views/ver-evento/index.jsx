import './style.css'

import { db } from '../../services/firebase';
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'

export function VerEvento() {
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
    }

    getEvento()
  }, [])

  return (
    <main>
      <section>
        <h2>ver evento</h2>
        <form>
          <label htmlFor="titulo">Título:</label>
          <input type="text" name="titulo" id="titulo" value={evento.titulo} onChange={(e) => setTitulo(e.target.value)} />
          <label htmlFor="tipo">Tipo do evento:</label>
          <select name="tipo" id="tipo" value={evento.tipo} onChange={(e) => setTipo(e.target.value)}>
            <option selected >-- escolher --</option>
            <option>Festa</option>
            <option>Festival</option>
            <option>Show</option>
          </select>
          <label htmlFor="genero">Gênero musical:</label>
          <select name="genero" id="genero" value={evento.genero} onChange={(e) => setGenero(e.target.value)}>
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
          <textarea name="detalhes" id="detalhes" cols="30" rows="5" value={evento.detalhes} onChange={(e) => setDetalhes(e.target.value)}></textarea>
          <label htmlFor="data">Data:</label>
          <input type="date" name="data" id="data" value={evento.data} onChange={(e) => setData(e.target.value)} />
          <label htmlFor="hora">Hora:</label>
          <input type="time" name="hora" id="hora" value={evento.hora} onChange={(e) => setHora(e.target.value)} />
          <label htmlFor="censura">Censura:</label>
          <select name="censura" id="censura" value={evento.censura} onChange={(e) => setCensura(e.target.value)}>
            <option selected >-- escolher --</option>
            <option>18 anos</option>
            <option>16 anos</option>
            <option>14 anos</option>
            <option>Livre</option>
          </select>
          <label htmlFor="flyer" className='label__file'>Escolher Flyer do Evento:</label>
          <input type="file" name="flyer" id="flyer" onChange={(e) => setFlyer(e.target.files[0])} />
          <button type='button' className='btn' >Publicar Evento</button>
        </form>
      </section>
    </main>
  )
}