import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})
export const AuthContextProvider = (props) => {
  const [usuario, setUsuario] = useState({ signed: false })

  useEffect(() => {
    var storage = localStorage.getItem("user")
    if (storage) {
      setUsuario(JSON.parse(storage))
    } else {
      setUsuario({ signed: false })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {props.children}
    </AuthContext.Provider>
  )
}