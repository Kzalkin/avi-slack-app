import React from 'react'
import '../assets/styles/Login.scss'

function Login() {
  return (
    <section className='login-container'>
    <h1>Log in</h1>
    <form className='login-form'>
        <input className='input' type="text" placeholder='Email' autoComplete='off' />
        <input className='input' type="text" placeholder='Password' autoComplete='off' />
        <button disabled={true}>Submit</button>
    </form>
</section>
  )
}

export default Login