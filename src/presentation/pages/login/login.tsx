import React from 'react'
import Header from '~/presentation/components/login-header/login-header'
import Input from '~/presentation/components/input/input'
import Footer from '~/presentation/components/footer/footer'
import FormStatus from '~/presentation/components/form-status/form-status'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header/>
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail"/>
        <Input type="password" name="password" placeholder="Digite sua senha"/>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer/>
    </div>
  )
}

export default Login
