

import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../contexts/chat/ChatContext'
import { types } from '../types/types'

export const Logout = () => {

    const { auth, logout } = useContext( AuthContext )
    const { dispatch } = useContext( ChatContext )


    const handleLogout = () => {

        dispatch({
            type: types.chatClean
        })

        logout()
    }


    return (
        <div className="headind_srch">
                    <div className="recent_heading mt-2">
                        <h4>Chat App - { auth.name }</h4>
                    </div>
                    <div className="srch_bar">
                        <div className="stylish-input-group">
                            <button 
                                className="btn text-danger"
                                onClick={ handleLogout }>
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
    )
}
