import React from 'react'
import '../assets/styles/Registration.scss'

function Registration() {
  return (
    <section className='registration-container'>
        <h1>Register</h1>
        <form className='registration-form'>
            <input className='input' type="text" placeholder='Email' autoComplete='off' />
            <input className='input' type="text" placeholder='Password' autoComplete='off' />
            <input className='input' type="text" placeholder='Confirm Password' autoComplete='off' />
            <button disabled={true}>Submit</button>
        </form>
    </section>
  )
}

export default Registration