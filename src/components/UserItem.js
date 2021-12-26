

import React, { useContext } from 'react'
import { ChatContext } from '../contexts/chat/ChatContext'
import { fecthWithToken } from '../helpers/fetch'
import { scrollToBottom } from '../helpers/scroll'
import { types } from '../types/types'

export const UserItem = ( { user } ) => {

    const { chatState, dispatch } = useContext( ChatContext )
    const { userTo } = chatState;

    const showChat = async () => {
        dispatch({
            type: types.showChat,
            payload: user.uid
        })

        // Cargar los mensajes del chat
        const resp = await fecthWithToken(`mensajes/${ user.uid }`, )
        dispatch({
            type: types.getAllMessages,
            payload: resp.mensajes
        })

        scrollToBottom('mensajes')

    }


    return (
        <div 
            className={`chat_list ${ user.uid === userTo && 'active_chat' }`}
            onClick={ showChat }
            >
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://digitalmgs.com/foro/ext/dark1/memberavatarstatus/image/avatar.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ user.name }</h5>
                    {
                        user.online 
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
