import { db } from '../../services/firebase'
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

import './style.css'

export function MostraEventos() {
  const { usuario } = useContext(AuthContext)
  const [eventoID, setEventoID] = useState('')
  const [eventoData, setEventoData] = useState([])

  useEffect(() => {
    const eventosRef = collection(db, "eventos")
    async function getEventos() {
      const q = query(eventosRef, where("autor", "==", usuario.id));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setEventoID(doc.id)
        setEventoData(querySnapshot.docs.map((doc) => ({ ...doc.data() })))
      })
    }

    getEventos()
  }, [])

  return (
    <section className='meusEventos'>
      <h2>Meus Eventos</h2>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Publico</th>
            <th>Visualizações</th>
            <th>Data</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {eventoData.map((evento) => {
            return (
              <tr>
                <td>{evento.titulo}</td>
                <td>{evento.publico == true ? 'Sim' : 'Não'}</td>
                <td>{evento.visualizacoes}</td>
                <td><input type="date" name="data" id="data" value={evento.data} disabled /></td>
                <td><button className='btn--primary'>Ver Mais</button></td>
                <td><button className='btn--danger'>Excluir</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}