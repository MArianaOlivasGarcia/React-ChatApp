

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'

export const RegisterPage = () => {

    const { register } = useContext( AuthContext )


    const [form, setForm] = useState({
      email: 'test2@test.com',
      password: '',
      name: 'Test2',
    })

    const { email, password, name } = form;

    const onChange = ({target}) => {
      const { name, value } = target

      setForm({
        ...form,
        [name]: value
      })
    }


    const handleSubmit = async ( e ) => {
      e.preventDefault();

      const { status, msg } = await register( name, email, password )
      
      if ( !status ){
        Swal.fire({
          text: msg ? msg : 'Oops! Algo salio mal.',
          icon: 'error'
        })
      }
    }


    const isValid = () => {
      return ( name.length > 0 && email.length > 0 && password.length > 0 ) ? true : false
    }

    return (
      <form className="login100-form validate-form flex-sb flex-w"
          onSubmit={ handleSubmit }>
        
        <div style={{
        width: '100%',
        justifyContent: 'center',
        display: 'flex'
      }}>
        <img src="/logo192.png"/>
      </div>

      <span className="login100-form-title mb-3">
        Nueva cuenta
      </span>

        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" 
              type="text" 
              name="name" 
              value={ name }
              onChange={ onChange }
              placeholder="Nombre" />
          <span className="focus-input100"></span>
        </div>


        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" 
              type="email" 
              name="email" 
              value={ email }
              onChange={ onChange }
              placeholder="Email" />
          <span className="focus-input100"></span>
        </div>


        <div className="wrap-input100 validate-input mb-3">
          <input className="input100" 
              type="password" 
              name="password" 
              value={ password }
              onChange={ onChange }
              placeholder="Password" />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col text-right">
            <Link to="/auth/login" className="txt1">
              ¿Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button 
            type='submit'
            className="login100-form-btn"
            disabled={ !isValid() }>
            Crear cuenta
          </button>
        </div>

    </form>
    )
}
