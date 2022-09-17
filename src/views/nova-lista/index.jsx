import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { db } from '../../services/firebase'
import './style.css'

import { collection, addDoc } from "firebase/firestore";

let inputTitulo = document.getElementById("titulo");
let inputDetalhes = document.getElementById("detalhes");
let inputData = document.getElementById("data");

export function NovaLista() {
  const { usuario } = useContext(AuthContext)

  const [titulo, setTitulo] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState('')
  const usuarioID = usuario.id

  async function cadastrar() {

    const docRef = await addDoc(collection(db, "listas"), {
      titulo: titulo,
      detalhes: detalhes,
      data: data,
      autor: usuarioID,
      publico: true,
      criacao: new Date(),
      inscritos: {}
    });

    alert('Lista Publicada!')

    inputTitulo.value = ''
    inputDetalhes.value = ''
    inputData.value = ''
  }

  return (
    <section className='nova-lista'>
      <h2>Nova Lista</h2>
      <form>
        <label htmlFor="data">Titulo:</label>
        <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <label htmlFor="detalhes">Detalhes da Lista:</label>
        <textarea name="detalhes" id="detalhes" cols="30" rows="5" value={detalhes} onChange={(e) => setDetalhes(e.target.value)}></textarea>
        <label htmlFor="hora">Data:</label>
        <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
        <button type='button' className='btn' onClick={cadastrar}>Publicar Lista</button>
      </form>
    </section>
  )
}