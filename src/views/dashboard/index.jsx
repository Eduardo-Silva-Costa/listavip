import './style.css'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'


import { MostraEventos } from '../mostra-eventos'
import { NovoEvento } from '../novo-evento'
import { MostraListas } from '../mostra-listas'
import { NovaLista } from '../nova-lista'

import { Navigate } from 'react-router-dom'

export function Dashboard() {
  const { usuario, setUsuario } = useContext(AuthContext)

  function deslogar() {
    localStorage.removeItem("user")
  }

  if (usuario.signed == true) {
    return (
      <main>
        <section className='dashboard'>
          <div className="dash">
            <p>Olá, {usuario.nome}</p>
            <button type='button' className='btn' onClick={deslogar}>Sair</button>
          </div>
          <div className="contente">
            <MostraEventos />
            <NovoEvento />
            <MostraListas />
            <NovaLista />
          </div>
        </section>
      </main>
    )
  } else {
    return <Navigate to="/login" />
  }
}