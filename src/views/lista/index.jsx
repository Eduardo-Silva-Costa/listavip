import './style.css'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/authContext'
import { ListaContext } from '../../contexts/listaContex'
import { useContext } from 'react'

export function Lista() {
  const { usuario } = useContext(AuthContext)
  const { lista, setLista } = useContext(ListaContext)
  function message() {
    alert("Agora seu nome está na lista")
  }
  return (
    <main>
      <section className='lista'>
        <Link to="/listas"><i className="bi bi-arrow-left-circle"> Voltar</i></Link>
        <p>Titulo: {lista.titulo}</p>
        <p>Detalhes: {lista.detalhes}</p>
        <p>Data: {lista.data}</p>
        <form>
          <label htmlFor="nome">Colocar nome na lista?</label>
          <input type="text" name="nome" id="nome" placeholder='Escreva seu nome completo aqui' />
          <button type='button' className='btn' onClick={message}>Colocar nome na lista agora</button>
        </form>
      </section>
    </main>
  )
}