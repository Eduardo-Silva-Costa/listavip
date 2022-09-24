import { db } from '../../services/firebase'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

import { Link } from 'react-router-dom'

import './style.css'

export function MinhasListas() {
  const { usuario } = useContext(AuthContext)
  const [listas, setListas] = useState([])

  useEffect(() => {
    const listasRef = collection(db, "listas")
    async function getListas() {
      const q = query(listasRef, where("autor", "==", usuario.id));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        let evento = { id: doc.id, dados: doc.data() }
        setListas(arr => [...arr, evento])
      })
    }

    getListas()
  }, [])

  return (
    <section className='minhasListas'>
      <h2>Minhas listas</h2>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Inscrições</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listas.map((lista) => {
            return (
              <tr>
                <td>{lista.dados.titulo}</td>
                <td>{lista.dados.inscricoes.length}</td>
                <td>{lista.dados.data}</td>
                <td><Link className='btn' to={`/ver-lista/${lista.id}`}>Ver Mais</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}