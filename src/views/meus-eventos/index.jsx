import { db } from '../../services/firebase'
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

import { Link } from 'react-router-dom'

import './style.css'

export function MeusEventos() {
  const { usuario } = useContext(AuthContext)
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    const eventosRef = collection(db, "eventos")
    async function getEventos() {
      const q = query(eventosRef, where("autor", "==", usuario.id))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        let evento = { id: doc.id, dados: doc.data() }
        setEventos(arr => [...arr, evento])
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
          {eventos.map((evento) => {
            return (
              <tr>
                <td>{evento.dados.titulo}</td>
                <td>{evento.dados.publico == true ? 'Sim' : 'Não'}</td>
                <td>{evento.dados.visualizacoes}</td>
                <td>{evento.dados.data}</td>
                <td><Link className='btn' to={`/ver-evento/${evento.id}`}>Ver Mais</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}