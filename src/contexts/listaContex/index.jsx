import { createContext, useState } from 'react'

export const ListaContext = createContext({})
export const ListaContextProvider = (props) => {
  const [lista, setLista] = useState({})
  return (
    <ListaContext.Provider value={{ lista, setLista }}>
      {props.children}
    </ListaContext.Provider>
  )
}