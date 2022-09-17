import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { db, storage } from '../../services/firebase'
import './style.css'

import { collection, addDoc, where } from "firebase/firestore"
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage"

let inputTitulo = document.getElementById("titulo");
let inputTipo = document.getElementById("tipo");
let inputGenero = document.getElementById("genero");
let inputDetalhes = document.getElementById("detalhes");
let inputData = document.getElementById("data");
let inputHora = document.getElementById("hora");

export function NovoEvento() {

  const { usuario } = useContext(AuthContext)

  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('')
  const [genero, setGenero] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [censura, setCensura] = useState('')
  const [flyer, setFlyer] = useState('')
  const usuarioID = usuario.id

  function cadastrar() {
    const storageRef = ref(storage, `images/${flyer.name}`)

    uploadBytes(storageRef, flyer).then((snapshot) => { })

    const uploadTask = uploadBytesResumable(storageRef, flyer)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const docRef = addDoc(collection(db, "eventos"), {
            foto: downloadURL,
            tipo: tipo,
            titulo: titulo,
            genero: genero,
            data: data,
            hora: hora,
            detalhes: detalhes,
            censura: censura,
            autor: usuarioID,
            visualizacoes: 0,
            publico: true,
            criacao: new Date()
          });
        });
      }
    );

    alert('Evento Publicado')

    inputTitulo.value = ''
    inputTipo.value = ''
    inputGenero.value = ''
    inputDetalhes.value = ''
    inputData.value = ''
    inputHora.value = ''
  }

  return (
    <section className='novo-evento'>
      <h2>Novo Evento</h2>
      <form>
        <label htmlFor="titulo">Título:</label>
        <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <label htmlFor="tipo">Tipo do evento:</label>
        <select name="tipo" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option selected >-- escolher --</option>
          <option>Festa</option>
          <option>Festival</option>
          <option>Show</option>
        </select>
        <label htmlFor="genero">Gênero musical:</label>
        <select name="genero" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option selected value>-- escolher --</option>
          <option>Anos 80</option>
          <option>Baile da Sudade</option>
          <option>Brega</option>
          <option>Carimbó</option>
          <option>Eletrônica</option>
          <option>Forró</option>
          <option>Funk</option>
          <option>Mid Back</option>
          <option>MPB</option>
          <option>Outro</option>
          <option>Pop</option>
          <option>Rap</option>
          <option>Reggae</option>
          <option>Rock</option>
          <option>Samba</option>
          <option>Sertanejo</option>
        </select>
        <label htmlFor="detalhes">Detalhes do Evento:</label>
        <textarea name="detalhes" id="detalhes" cols="30" rows="5" value={detalhes} onChange={(e) => setDetalhes(e.target.value)}></textarea>
        <label htmlFor="data">Data:</label>
        <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
        <label htmlFor="hora">Hora:</label>
        <input type="time" name="hora" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
        <label htmlFor="censura">Censura:</label>
        <select name="censura" id="censura" value={censura} onChange={(e) => setCensura(e.target.value)}>
          <option selected >-- escolher --</option>
          <option>18 anos</option>
          <option>16 anos</option>
          <option>14 anos</option>
          <option>Livre</option>
        </select>
        <label htmlFor="flyer" className='label__file'>Escolher Flyer do Evento:</label>
        <input type="file" name="flyer" id="flyer" onChange={(e) => setFlyer(e.target.files[0])} />
        <button type='button' className='btn' onClick={cadastrar}>Publicar Evento</button>
      </form>
    </section>
  )
}