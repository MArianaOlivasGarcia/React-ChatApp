import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { scrollToBottomAnimated } from "../helpers/scroll";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";


export const SocketContext = createContext()


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080')

    const { auth } = useContext( AuthContext )
    const { dispatch } = useContext( ChatContext )

    useEffect(() => {
        
        if ( auth.isLogged ) {
            conectarSocket()
        }

    }, [ auth, conectarSocket ])

    useEffect(() => {
        if ( !auth.isLogged ) {
            desconectarSocket()
        }

    }, [ auth, desconectarSocket ])


    // Escuchar todos los usuarios 
    useEffect(() => {
        
        socket?.on('lista-usuarios', (users) => {
            dispatch({
                type: types.getUsers,
                payload: users
            })
        })

    }, [ socket, dispatch ])

    // Escuchar mensajes 
    useEffect(() => {
        
        socket?.on('mensaje-personal', (message) => {
            dispatch({
                type: types.newMessage,
                payload: message
            })
            scrollToBottomAnimated('mensajes')
        })


    }, [ socket, dispatch ])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )

}