import './style.css'

import { Link } from 'react-router-dom'
import { ListaContext } from '../../contexts/listaContex'
import { useContext, useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export function Listas() {
  const { setLista } = useContext(ListaContext)
  const [listas, setListas] = useState([])

  const useCollectionRef = collection(db, 'listas')

  useEffect(() => {
    const listasRef = collection(db, "listas")
    async function getListas() {
      const hoje = new Date()
      const q = query(listasRef, orderBy('data', 'asc'));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setListas(querySnapshot.docs.map((doc) => ({ ...doc.data() })))
      })
    }

    getListas()
  }, [])

  return (
    <main>
      <section className='listas'>
        <h2>Listas</h2>
        <ul>
          {listas.map((lista) => {
            return (
              <li><Link to="/lista" onClick={() => setLista({
                titulo: lista.titulo,
                detalhes: lista.detalhes,
                data: lista.data,
              })}>{lista.titulo}</Link></li>
            );
          })}
        </ul>
      </section>
    </main>
  )
}