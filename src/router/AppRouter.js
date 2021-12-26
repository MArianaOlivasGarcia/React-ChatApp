

import React, { useContext, useEffect } from 'react'
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { ChatPage } from '../pages/ChatPage'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    const { auth, verificaToken } = useContext( AuthContext )


    useEffect( () => {
        verificaToken()
    }, [ verificaToken ])

    // Verificar el estado de la autenticación
    if ( auth.checking ) {
        return <h1>Espere por favor...</h1>
    }


    return (
        <Router>
            <div>

                <Switch>
                    {/* <Route path="/auth" component={ AuthRouter } /> */}
                    {/* <Route exact path="/" component={ ChatPage } /> */}

                    <PublicRoute isAuthenticated={ auth.isLogged } path="/auth" component={ AuthRouter }/>
                    <PrivateRoute isAuthenticated={ auth.isLogged } path="/" component={ ChatPage }/>

                    <Redirect to="/"/>
                </Switch>

            </div>
        </Router>
    )
}
