import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '~/presentation/components'
import Context from '~/presentation/contexts/form/form-context'
import { Validation } from '~/presentation/protocols/validation'
import { Authentication } from '~/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}
const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    emailError: '',
    passwordError: '',
    mainError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      const { email, password, isLoading, passwordError, emailError } = state
      if (isLoading || passwordError || emailError) return

      setState({ ...state, isLoading: true })
      const account = await authentication.auth({ email, password })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button data-testid="submit" className={Styles.submit} disabled={!!state.emailError || !!state.passwordError} type="submit">Entrar</button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer/>
    </div>
  )
}

export default Login
