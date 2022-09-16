import { db } from '../../services/firebase'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

import './style.css'

export function MostraListas() {
  const { usuario } = useContext(AuthContext)
  const [listaID, setListaID] = useState('')
  const [listaData, setListaData] = useState([])

  useEffect(() => {
    const listasRef = collection(db, "listas")
    async function getListas() {
      const q = query(listasRef, where("autor", "==", usuario.id));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setListaID(doc.id)
        setListaData(querySnapshot.docs.map((doc) => ({ ...doc.data() })))
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
            <th>Publico</th>
            <th>Inscrições</th>
            <th>Data</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaData.map((lista) => {
            return (
              <tr>
                <td>{lista.titulo}</td>
                <td>{lista.publico == true ? 'Sim' : 'Não'}</td>
                <td>{lista.inscritos == {} ? 0 : 100}</td>
                <td><input type="date" name="data" id="data" value={lista.data} disabled /></td>
                <td><button className='btn--primary'>Ver mais</button></td>
                <td><button className='btn--danger'>Excluir</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}