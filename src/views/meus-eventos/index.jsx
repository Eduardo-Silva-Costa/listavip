import { db } from '../../services/firebase'
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

import { Link } from 'react-router-dom'

import './style.css'

export function MeusEventos() {
  const { usuario } = useContext(AuthContext)
  console.log(usuario.id)
  const [eventoData, setEventoData] = useState([])

  useEffect(() => {
    const eventosRef = collection(db, "eventos")
    async function getEventos() {
      const q = query(eventosRef, where("autor", "==", usuario.id));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
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
          </tr>
        </thead>
        <tbody>
          {eventoData.map((evento) => {
            return (
              <tr>
                <td>{evento.titulo}</td>
                <td>{evento.publico == true ? 'Sim' : 'Não'}</td>
                <td>{evento.visualizacoes}</td>
                <td>{evento.data}</td>
                <td><Link className='btn' to="/ver-evento">Ver Mais</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}