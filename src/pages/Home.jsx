import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
      <nav>
          <Link to='/login'>Log In</Link>
          <Link to='/register'>Register</Link>
      </nav>
  )
}

export default Home