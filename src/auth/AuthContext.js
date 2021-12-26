import { createContext, useCallback, useState } from "react";
import { fecthWithoutToken, fecthWithToken } from "../helpers/fetch";



export const AuthContext = createContext();


const initialState = {

    uid: null,
    checking: true,
    isLogged: false,
    name: null,
    email: null

}

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState);

    // console.log(auth)


    const login = async ( email, password ) => {

        // Peticion HTTP
        const resp = await fecthWithoutToken( 'login', { email, password }, 'POST')
        
        console.log(resp)
        
        if ( resp.status ) {
            localStorage.setItem('token', resp.token )
            const { uid, name, email } = resp.usuario

            setAuth({
                uid,
                name,
                email,
                checking: false,
                isLogged: true
            })

            console.log('AUTENTICADO')
        }

        return resp.status

    }

    const register = async ( name, email, password ) => {
        
        const resp = await fecthWithoutToken( 'new', { name, email, password }, 'POST')
        
        console.log(resp)
        
        if ( resp.status ) {
            localStorage.setItem('token', resp.token )
            const { uid, name, email } = resp.usuario

            setAuth({
                uid,
                name,
                email,
                checking: false,
                isLogged: true
            })

            console.log('REGISTRADO')
        }

        return resp

    }


    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token')

        if ( !token ) {
            setAuth({
                checking: false,
                isLogged: false,
                uid: null,
                email: null,
                name: null,
            })

            return false
        }

        const resp = await fecthWithToken('renew')

        if ( resp.status ) {
            localStorage.setItem('token', resp.token )
            const { uid, name, email } = resp.usuario

            setAuth({
                uid,
                name,
                email,
                checking: false,
                isLogged: true
            })

            console.log('RENEW TOKEN')
            return true
        } else {
            setAuth({
                uid: null,
                name: null,
                email: null,
                checking: false,
                isLogged: false
            })
            return false
        }


    }, [])



    const logout = () => {
        
        localStorage.removeItem('token')
        // Si los mando null no es necesario mandarlos
        setAuth({
            checking: false,
            isLogged: false
        })

    }
    

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
