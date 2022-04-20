import React from 'react'
import '../assets/styles/Logo.scss'
import logo from '../assets/img/logo.png'

const Logo = () => {
  return (
    <div className="logo">
    <img
      src={logo}
      alt="slack logo"
    />
    <span>slack</span>
    </div>
  )
}

export default Logo