


import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../contexts/chat/ChatContext'
import { MyMessage } from './MyMessage'
import { SendMessage } from './SendMessage'
import { UserMessage } from './UserMessage'

export const Messages = () => {

    const { auth } = useContext( AuthContext )
    const { chatState } = useContext( ChatContext )

    const { messages } = chatState

    return (
        <div className="mesgs">

                <div id="mensajes"
                    className="msg_history">

                    {
                        messages.map( message => (
                            // Mi mensaje (que yo mando)
                            ( message.de === auth.uid )
                                ? <MyMessage message={ message } key={ message._id }/>
                                : <UserMessage message={ message } key={ message._id }/>
                        ))
                    }

                </div>

                <SendMessage />

            </div>
    )
}
