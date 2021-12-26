

import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../contexts/chat/ChatContext'
import { UserItem } from './UserItem'

export const Sidebar = () => {

    const { auth } = useContext( AuthContext )
    const { chatState } = useContext( ChatContext )

    const { users } = chatState;

    return (
        <div className="inbox_chat">


                    {
                        users
                            .filter( user => user.uid !== auth.uid )
                            .map( user => ( 
                                <UserItem 
                                    key={ user.uid }
                                    user={ user }
                                />
                        ))
                    }


                    <div className="extra_space"></div>


                </div>
    )
}
