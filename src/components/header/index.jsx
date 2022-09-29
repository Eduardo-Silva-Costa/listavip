import './style.css'

import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { NavLink } from 'react-router-dom'

import Modal from 'react-modal'
Modal.setAppElement("#root");

export function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { usuario, setUsuario } = useContext(AuthContext)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header>
      <h1><a href="/">Lista <span>Vip</span></a></h1>
      <nav>
        <NavLink to="/">Eventos</NavLink>
        <NavLink to="/listas">Listas</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/contato">Contato</NavLink>
        {
          usuario.signed == false ?
            <NavLink to="/login">Login</NavLink>
            :
            <NavLink to="/dashboard" onClick={closeModal}>Meu Espaço</NavLink>
        }
      </nav>
      <i className="bi bi-list" onClick={openModal}></i>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <nav className='nav__modal'>
          <NavLink to="/" onClick={closeModal}>Eventos</NavLink>
          <NavLink to="/listas" onClick={closeModal}>Listas</NavLink>
          <NavLink to="/sobre" onClick={closeModal}>Sobre</NavLink>
          <NavLink to="/contato" onClick={closeModal}>Contato</NavLink>
          {
            usuario.signed == false ?
              <NavLink to="/login" onClick={closeModal}>Login</NavLink>
              :
              <NavLink to="/dashboard" onClick={closeModal}>Meu Espaço</NavLink>
          }
        </nav>
      </Modal>
    </header>
  )
}