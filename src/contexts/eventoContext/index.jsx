import { createContext, useState } from 'react'

export const EventoContext = createContext({})
export const EventoContextProvider = (props) => {
  const [evento, setEvento] = useState({})
  return (
    <EventoContext.Provider value={{ evento, setEvento }}>
      {props.children}
    </EventoContext.Provider>
  )
}