

import React, { useContext, useState } from 'react'
import { SocketContext } from '../contexts/SocketContext'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../contexts/chat/ChatContext'

export const SendMessage = () => {

    const { socket } = useContext( SocketContext )
    const { auth } = useContext( AuthContext )
    const { chatState } = useContext( ChatContext )

    const [message, setMessage] = useState('')

    const onChange = ( {target} ) => {
        setMessage( target.value )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()

        if ( message.length === 0 ) return 

        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.userTo,
            mensaje: message
        })
        
        setMessage('')
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={ message }
                        onChange={ onChange }
                        />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
