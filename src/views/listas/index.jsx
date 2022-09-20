import './style.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export function Listas() {
  const [listas, setListas] = useState([])

  useEffect(() => {
    const listasRef = collection(db, "listas")
    async function getListas() {
      const q = query(listasRef, orderBy('data', 'asc'));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        var lista = { id: doc.id, dados: doc.data() }
        setListas(arr => [...arr, lista]);
      })
      console.log(listas)
    }

    getListas()
  }, [])

  return (
    <main>
      <section className='listas'>
        <h2>Listas</h2>
        <ul>
          {
            listas.map((lista) => {
              return (
                <li key={lista.id}><Link to={`/lista/${lista.id}`}>{lista.dados.titulo}</Link></li>
              );
            })
          }
        </ul>
      </section>
    </main>
  )
} 