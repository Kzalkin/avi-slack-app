import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Home.scss'

function Home() {
  return (
      <div className='links'>
          <Link className="link-item" to='/login'>Log In</Link>
          <Link className="link-item" to='/register'>Register</Link>
      </div>
  )
}

export default Home