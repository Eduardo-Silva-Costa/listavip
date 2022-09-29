import './style.css'

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export function Inscricoes() {
  const { id } = useParams()
  const [lista, setLista] = useState({})
  const [inscricoes, setInscricoes] = useState([])

  useEffect(() => {
    const docRef = doc(db, "listas", id)
    async function getLista() {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLista(docSnap.data())
        setInscricoes(docSnap.data().inscricoes)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getLista()
  }, [])

  const inscritos = inscricoes.map(
    (i) => <li>{i}</li>
  )

  function gerarPdf(array) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const titulo = [{ text: "Inscritos na lista", fontSize: 15, bold: true, margin: [15, 20, 0, 45] }]
    const listaInscritos = [{ text: `${lista.titulo}`, style: 'header' },
    {
      ol: inscricoes
    }]

    const config = {
      pageSize: 'A4',
      pageMargins: [15, 50, 15, 40],
      header: [titulo],
      content: [listaInscritos],

    }

    pdfMake.createPdf(config).download()
  }

  function volta() {

    window.history.back();
  }

  return (
    <main>
      <h2>Inscritos</h2>
      <section className='inscricoes'>
        <ol>
          <>
            {inscritos}
          </>
        </ol>
        <div className='pdf'>
          <button type='button' className='btn' onClick={(e) => gerarPdf(inscricoes)}>Gerar <i class="bi bi-filetype-pdf"></i></button>
        </div>
        <i className="bi bi-arrow-left-circle" onClick={volta}> Voltar</i>
      </section>
    </main>
  )
}