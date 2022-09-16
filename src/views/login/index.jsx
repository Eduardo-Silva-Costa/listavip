import "./style.css";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, storage } from '../../services/firebase'

const provider = new GoogleAuthProvider();

import { AuthContext } from '../../contexts/authContext'
import { Navigate } from "react-router-dom";
import { useContext } from 'react'

export function Login() {
  const { usuario } = useContext(AuthContext)

  console.log(usuario)
  function logar() {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      localStorage.setItem('user', JSON.stringify({ signed: true, id: user.uid, nome: user.displayName }))

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  if (usuario.signed == true) {
    return <Navigate to="/dashboard" />
  } else {
    return (
      <main>
        <section className="login">
          <button type="button" className="btn" onClick={logar}>Logar com o Google</button>
        </section>
      </main>
    )
  }
}